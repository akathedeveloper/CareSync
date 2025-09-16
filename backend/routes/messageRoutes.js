import express from 'express'
import { createOrGetConversation, getConversationMessages, getUserConversations, sendMessage } from '../controllers/messageController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();


router.route('/conversations').get( isAuthenticated, getUserConversations);
router.route('/conversations/:conversationId').get( isAuthenticated, getConversationMessages);
router.route('/send').post( isAuthenticated, sendMessage);
router.route('/conversations').post( isAuthenticated, createOrGetConversation);

export default router;
