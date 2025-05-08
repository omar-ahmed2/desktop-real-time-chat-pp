import express from 'express';  // To handle requests
import mongoose from 'mongoose';  // To interact with MongoDB
import dotenv from 'dotenv';  // To load environment variables from .env file
import cors from 'cors';  // To handle cross-origin requests
import authRoutes from './routes/auth.js';  // Import auth routes

dotenv.config();  // Load environment variables

const app = express();

// Middlewares
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // To allow requests from different origins

// Mount your authentication routes
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the main server!');
});

const PORT = process.env.PORT || 3000;  // Set port for the server
const MONGO_URI = process.env.MONGO_URI;  // Get MongoDB URI from environment variables

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Connection error:', err);
});
