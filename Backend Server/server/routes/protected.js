import express from 'express';
import { authenticateToken } from '../middleware/authentication.js';
import { sendFriendRequest } from '../controllers/userController.js';
import { removeFriend } from '../controllers/userController.js';
import { getAllUsers } from '../controllers/userController.js';
import { getUser } from '../controllers/userController.js';
const router = express.Router();
router.use(authenticateToken);
router.post('/sendfriend', sendFriendRequest);
router.post('/removefriend', removeFriend);
router.get('/getallusers', getAllUsers);
router.post('/getuser', getUser);

export default router;
