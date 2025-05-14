import express from 'express';
import { authenticateToken } from '../middleware/authentication.js';
import { sendFriendRequest } from '../controllers/userController.js';
import { removeFriend } from '../controllers/userController.js';
import { getAllUsers } from '../controllers/userController.js';
import { getUser } from '../controllers/userController.js';
import { fetchChatList } from '../controllers/chatController.js'
import { fetchChat } from '../controllers/chatController.js'
const router = express.Router();
router.use(authenticateToken);
router.post('/sendfriend', sendFriendRequest);
router.post('/removefriend', removeFriend);
router.get('/getallusers', getAllUsers);
router.post('/fetchchatlist', fetchChatList);
router.post('/getuser', getUser);
router.post('/fetchchat',fetchChat);
export default router;
