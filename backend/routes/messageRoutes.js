const express = require('express');
const {
  getUserConversations,
  getConversationMessages,
  sendMessage,
  createOrGetConversation
} = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/conversations', getUserConversations);

router.get('/conversations/:conversationId', getConversationMessages);

router.post('/send', sendMessage);

router.post('/conversations', createOrGetConversation);

module.exports = router;
