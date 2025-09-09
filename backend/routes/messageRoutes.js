import express from 'express'
import { createOrGetConversation, getConversationMessages, getUserConversations, sendMessage } from '../controllers/messageController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.route('/conversations').get( isAuthenticated, getUserConversations);
router.route('/conversations/:conversationId').get( isAuthenticated, getConversationMessages);
router.route('/send').post( isAuthenticated, sendMessage);
router.route('/conversations').post( isAuthenticated, createOrGetConversation);

export default router;
