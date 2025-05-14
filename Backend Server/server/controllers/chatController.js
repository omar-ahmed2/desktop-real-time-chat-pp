import Chat from "../models/Chat.js";
import { v4 as uuidv4 } from "uuid";
import { io } from "../server.js";
export const fetchChatList = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Find only chats where the user is a participant
    const chatList = await Chat.find({
      participants: userId,
    })
      .select("chatroom participants lastMessage")
      .populate("participants", "name firstName lastName avatar")
      .sort({ "lastMessage.time": -1 });
    console.log(`Found ${chatList.length} chats for user ${userId}`);

    res.status(200).json(chatList);
  } catch (error) {
    console.error("Error fetching chatList:", error);
    res.status(500).json({ message: "Failed to retrieve Chatlist" });
  }
};

export const fetchChat = async (req, res) => {
  const { id, ids } = req.body;
  try {
    let chats;
    if (Array.isArray(ids)) {
      chats = await Chat.find({ _id: { $in: ids } })
        .select("chat participants lastMessage")
        .populate({
          path: "chat",
          select: "id user avatar message time",
          populate: {
            path: "user",
            select: "name firstName lastName avatar _id",
          },
        })
        .populate({
          path: "participants",
          select: "name firstName lastName avatar _id",
        })
        .sort({ "lastMessage.time": -1 });
    } else if (id) {
      chats = await Chat.findById(id)
        .select("chat participants lastMessage")
        .populate({
          path: "chat",
          select: "id user avatar message time",
          populate: {
            path: "user",
            select: "name firstName lastName avatar _id",
          },
        })
        .populate({
          path: "participants",
          select: "name firstName lastName avatar _id",
        })
        .sort({ "lastMessage.time": -1 });
    } else {
      return res.status(400).json({ error: "No 'id' or 'ids' provided." });
    }

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch chat room");
  }
};
export const sendChat = async (req, res) => {
  const { groupId, userId, message } = req.body;

  // Basic validation
  if (!groupId) {
    return res.status(400).json({ message: "Group ID is required" });
  }
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    // Fetch the chat and populate participants
    const chat = await Chat.findById(groupId).populate("participants", "avatar firstName lastName");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Check if user is a participant
    const participant = chat.participants.find(
      (p) => p._id.toString() === userId.toString()
    );

    if (!participant) {
      return res
        .status(403)
        .json({ message: "Access denied: You are not a participant of this chat" });
    }
    
    // Ensure avatar is a valid string
    const defaultAvatar = "/default-avatar.png";
    let avatarUrl = defaultAvatar;
    
    if (participant && participant.avatar) {
      avatarUrl = typeof participant.avatar === 'string' ? 
                 participant.avatar : 
                 (participant.avatar.toString ? participant.avatar.toString() : defaultAvatar);
    }
    
    // Create new message
    const newMessage = {
      id: uuidv4(),
      user: userId,
      avatar: avatarUrl,
      message: message,
      time: new Date(),
    };

    // IMPORTANT: Fix any existing messages with missing avatars
    if (chat.chat && Array.isArray(chat.chat)) {
      for (let i = 0; i < chat.chat.length; i++) {
        if (!chat.chat[i].avatar) {
          chat.chat[i].avatar = defaultAvatar;
        }
      }
    }

    // Add message to chat
    chat.chat.push(newMessage);

    // Update lastMessage
    chat.lastMessage = {
      user: userId,
      message: message,
      time: newMessage.time,
    };

    // Save changes
    await chat.save();
    
    // Emit the message to all connected users with detailed data
    io.emit("message_sent", {
      chatId: groupId,
      message: newMessage,
      sender: userId,
      participants: chat.participants.map(p => p._id.toString())
    });
    
    // Return the new message
    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error sending chat message:", err);
    
    // Provide more detailed error information for debugging
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error",
        details: err.message,
        path: err.errors ? Object.keys(err.errors).join(', ') : 'unknown'
      });
    }
    
    return res.status(500).json({ message: "Server error" });
  }
};