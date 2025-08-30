const Message = require('../db/models/Message');
const Conversation = require('../db/models/Conversation');
<<<<<<< HEAD
const {User} = require('../db/models/User');
=======
const {User} = require('../db/models/User.js');
>>>>>>> upstream/main

const getUserConversations = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversations'
    });
  }
};

const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
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
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId, content, messageType = 'text' } = req.body;
    const senderId = req.user.id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    if (!conversation.participants.includes(senderId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
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
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

const createOrGetConversation = async (req, res) => {
  try {
    const { participantId } = req.body;
    const currentUserId = req.user.id;

    if (participantId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create conversation with yourself'
      });
    }

    const participant = await User.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
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
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create conversation'
    });
  }
};

module.exports = {
  getUserConversations,
  getConversationMessages,
  sendMessage,
  createOrGetConversation
};
