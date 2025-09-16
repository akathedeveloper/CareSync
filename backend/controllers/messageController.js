import Message from '../db/models/Message.js'
import Conversation from '../db/models/Conversation.js'
import catchAsync from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

const getMessages = async (req, res) => {
    res.json({ message: "Messages from branch" });
}


export const getUserConversations = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    
    const conversations = await Conversation.find({
      participants: userId
    })
    .populate('participants', 'name email')
    .populate('lastMessage')
    .sort({ lastMessageTime: -1 });

    res.json({
      success: true,
      data: conversations
    });
});

export const getConversationMessages = catchAsync(async (req, res, next) => {
    const { conversationId } = req.params;
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return next(new ErrorHandler("Conversation not found", 404))
    }

    if (!conversation.participants.includes(userId)) {
      return next(new ErrorHandler("Access denied", 403))
    }

    const messages = await Message.find({
      conversation: conversationId
    })
    .populate('sender', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    res.json({
      success: true,
      data: messages.reverse(),
      pagination: {
        page,
        limit,
        hasMore: messages.length === limit
      }
    });
});

export const sendMessage = catchAsync(async (req, res, next) => {
    const { conversationId, content, messageType = 'text' } = req.body;
    const senderId = req.user.id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return next(new ErrorHandler("Converstion not found", 404))
    }

    if (!conversation.participants.includes(senderId)) {
      return next(new ErrorHandler("Access Denied", 403))
    }

    const message = new Message({
      conversation: conversationId,
      sender: senderId,
      content: content.trim(),
      messageType
    });

    await message.save();

    conversation.lastMessage = message._id;
    conversation.lastMessageTime = new Date();
    await conversation.save();

    await message.populate('sender', 'name email');

    res.status(201).json({
      success: true,
      data: message
    });
});

export const createOrGetConversation = catchAsync(async (req, res, next) => {
    const { participantId } = req.body;
    const currentUserId = req.user.id;

    if (participantId === currentUserId) {
      return next(new ErrorHandler("Cannot create conversation with yourself", 400))
    }

    const participant = await User.findById(participantId);
    if (!participant) {
      return next(new ErrorHandler("User not found", 404))
    }

    let conversation = await Conversation.findOne({
      type: 'direct',
      participants: { 
        $all: [currentUserId, participantId],
        $size: 2
      }
    }).populate('participants', 'name email');

    if (!conversation) {
      conversation = new Conversation({
        participants: [currentUserId, participantId],
        type: 'direct'
      });
      await conversation.save();
      await conversation.populate('participants', 'name email');
    }

    res.json({
      success: true,
      data: conversation
    });
}
)