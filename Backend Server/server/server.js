import express from 'express';  // To handle requests
import mongoose from 'mongoose';  // To interact with MongoDB
import dotenv from 'dotenv';  // To load environment variables from .env file
import cors from 'cors';  // To handle cross-origin requests
import authRoutes from './routes/auth.js';  // Import auth routes
import protectedRoutes from './routes/protected.js';  // Import protected routes
import http from "http";
import { Server } from "socket.io";  // Import the socket.io server
dotenv.config();  // Load environment variables

const app = express();
const server = http.createServer(app); // Create HTTP server with express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
export  { io };

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id);
  
  // Add handler for user joining their room
  socket.on("join_user_room", (data) => {
    if (data.userId) {
      socket.join(`user_${data.userId}`);
      console.log(`User ${data.userId} joined their room`);
    }
  });
  
  // Add handler for friend request accepted
  socket.on("friend_request_accepted", (data) => {
    console.log("Friend request accepted:", data);
    // Broadcast to everyone - the userController will handle filtering
    io.emit("friend_added", data);
  });
  
  // Add handler for friend removed
  socket.on("friend_removed", (data) => {
    console.log("Friend removed:", data);
    // Broadcast to everyone - the client will handle filtering
    io.emit("friend_removed", data);
  });
  
  socket.on("message", (msg) => {
    console.log("Received message:", msg);
    io.emit("message", msg); // Broadcast
  });
  
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Use middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // To allow requests from different origins


// Normal HTTP route listeners
const PORT = process.env.PORT || 3000;  // Set port for the server
const MONGO_URI = process.env.MONGO_URI;  // Get MongoDB URI from environment variables

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  // Start the Express server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Connection error:', err);
});

// Mount your authentication and protected routes
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the main server!');
});