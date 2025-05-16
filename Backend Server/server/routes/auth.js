import express from 'express';
import { registerUser, loginUser , editUser , logout} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authentication.js';
const router = express.Router();

// Signup Route (create new user)
router.post('/signup', registerUser);

// Signin Route (user login)
router.post('/signin', loginUser);
router.post('/edituser',authenticateToken,editUser);
router.post('/logout', logout);
export default router;
