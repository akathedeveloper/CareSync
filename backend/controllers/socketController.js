import jwt from 'jsonwebtoken'
import { User } from '../db/models/User.js'
import Message from '../db/models/Message.js'
import Conversation from '../db/models/Conversation.js'
import catchAsync from '../middleware/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'

export const authenticateSocket = catchAsync(async (socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new ErrorHandler('No token provided', 404));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    socket.userId = user._id.toString();
    socket.user = user;
    next();
})

export const handleSocketConnection = (io) => {
  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.name} connected with socket ID: ${socket.id}`);

    socket.join(socket.userId);

    socket.on('join-conversations', catchAsync(async () => {
        const conversations = await Conversation.find({
          participants: socket.userId
        });

        conversations.forEach(conversation => {
          socket.join(conversation._id.toString());
        });

        socket.emit('conversations-joined', {
          success: true,
          count: conversations.length
        });
    }))

    // Handle sending messages
    socket.on('send-message', catchAsync( async (data) => {
        const { conversationId, content, messageType = 'text' } = data;

        // Verify conversation exists and user has access
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit('message-error', {
            error: 'Conversation not found'
          });
        }

        if (!conversation.participants.includes(socket.userId)) {
          return socket.emit('message-error', {
            error: 'Access denied'
          });
        }

        // Create message
        const message = new Message({
          conversation: conversationId,
          sender: socket.userId,
          content: content.trim(),
          messageType
        });

        await message.save();

        // Update conversation's last message
        conversation.lastMessage = message._id;
        conversation.lastMessageTime = new Date();
        await conversation.save();

        // Populate sender details
        await message.populate('sender', 'name email');

        // Emit to all users in the conversation
        io.to(conversationId).emit('new-message', {
          message,
          conversationId
        });

        // Send confirmation to sender
        socket.emit('message-sent', {
          success: true,
          message
        });
    }))

    // Handle typing indicators
    socket.on('typing-start', (data) => {
      const { conversationId } = data;
      socket.to(conversationId).emit('user-typing', {
        userId: socket.userId,
        userName: socket.user.name,
        conversationId
      });
    });

    socket.on('typing-stop', (data) => {
      const { conversationId } = data;
      socket.to(conversationId).emit('user-stopped-typing', {
        userId: socket.userId,
        conversationId
      });
    });

    // Handle message read status
    socket.on('mark-messages-read', catchAsync(async (data) => {
        const { conversationId } = data;

        // Update all unread messages in the conversation
        await Message.updateMany(
          {
            conversation: conversationId,
            sender: { $ne: socket.userId },
            'readBy.user': { $ne: socket.userId }
          },
          {
            $push: {
              readBy: {
                user: socket.userId,
                readAt: new Date()
              }
            }
          }
        );

        // Notify other participants
        socket.to(conversationId).emit('messages-read', {
          conversationId,
          readBy: socket.userId
        });
    }))

    // Handle user joining a specific conversation
    socket.on('join-conversation', catchAsync(async (data) => {
        const { conversationId } = data;
        
        // Verify user has access to the conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation || !conversation.participants.includes(socket.userId)) {
          return socket.emit('join-error', {
            error: 'Access denied or conversation not found'
          });
        }

        socket.join(conversationId);
        socket.emit('conversation-joined', {
          success: true,
          conversationId
        });

        // Notify other participants that user joined
        socket.to(conversationId).emit('user-joined-conversation', {
          userId: socket.userId,
          userName: socket.user.name,
          conversationId
        });
    }))

    // Handle user leaving a conversation
    socket.on('leave-conversation', (data) => {
      const { conversationId } = data;
      socket.leave(conversationId);
      
      socket.to(conversationId).emit('user-left-conversation', {
        userId: socket.userId,
        userName: socket.user.name,
        conversationId
      });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.user.name} disconnected: ${reason}`);
    });

    // Handle connection errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};
