import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Signup Route (create new user)
router.post('/signup', registerUser);

// Signin Route (user login)
router.post('/signin', loginUser);

export default router;
