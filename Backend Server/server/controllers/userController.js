import User from "../models/User.js"; // Assuming you have a User model
import Chat from "../models/Chat.js";
import { io } from "../server.js";
export const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "UserId not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "friendId not found" });
    }
    const userFriend = await User.findById(userId).populate("friends");
    if (
      userFriend.friends.some((friend) => friend._id.toString() === friendId)
    ) {
      return res.status(400).json({ message: "Already friends" });
    }
    if (user.friendsSent.includes(friendId)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }
    if (userId === friendId) {
      return res
        .status(400)
        .json({ message: "Cannot send friend request to yourself" });
    }
    if (friend.friendsSent.some((id) => id.toString() === userId.toString())) {
      friend.friends.push(userId);
      user.friends.push(friendId);

      // Emit event to both users with more detailed data
      io.emit("friend_added", {
        userId,
        friendId,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        friend: {
          _id: friend._id,
          firstName: friend.firstName,
          lastName: friend.lastName,
        },
      });

      // Remove pending requests
      user.friendsSent = user.friendsSent.filter(
        (id) => id.toString() !== friendId.toString()
      );
      user.friendsReceived = user.friendsReceived.filter(
        (id) => id.toString() !== friendId.toString()
      );
      friend.friendsSent = friend.friendsSent.filter(
        (id) => id.toString() !== userId.toString()
      );
      friend.friendsReceived = friend.friendsReceived.filter(
        (id) => id.toString() !== userId.toString()
      );
      const newChat = new Chat({
        isGroup: false, // or true, depending on use
        participants: [user._id, friend._id], // string array of user IDs
        lastMessage: {
          message: "",
          user: null,
          time: Date.now(), // Set initial time
        },
      });
      await newChat.save();
    } else {
      // Send new request
      
      friend.friendsReceived.push(userId);
      user.friendsSent.push(friendId);

      // Emit event to notify the receiving user about new friend request
      io.emit("friend_request_received", {
        senderId: userId,
        receiverId: friendId,
        sender: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }
    await user.save();
    await friend.save();
    res
      .status(200)
      .json({ message: "Friend request sent successfully", user, friend });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user data" });
  }
};
export const fetchFriendRequests = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId).populate("friendsReceived");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ friendRequests: user.friendsReceived });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user data" });
  }
};
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    if (
      !user.friends.some((friend) => friend._id.toString() === friendId) &&
      !user.friendsSent.some((friend) => friend._id.toString() === friendId) &&
      !user.friendsReceived.some((friend) => friend._id.toString() === friendId)
    ) {
      return res.status(400).json({ message: "Not friends" });
    }
    if (userId === friendId) {
      return res.status(400).json({ message: "Cannot remove yourself" });
    }

    // Remove from friends lists
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    user.friendsSent = user.friendsSent.filter(
      (id) => id.toString() !== friendId.toString()
    );
    user.friendsReceived = user.friendsReceived.filter(
      (id) => id.toString() !== friendId.toString()
    );
    friend.friendsSent = friend.friendsSent.filter(
      (id) => id.toString() !== userId.toString()
    );
    friend.friendsReceived = friend.friendsReceived.filter(
      (id) => id.toString() !== userId.toString()
    );
    
    // Find and delete the chat between these two users
    // Look for a non-group chat where both users are participants
    const chatToDelete = await Chat.findOne({
      participants: { 
        $all: [userId, friendId], 
        $size: 2 // Ensures only these two users are in the chat (direct messages)
      },
      isGroup: false
    });
    
    if (chatToDelete) {
      console.log(`Deleting chat ${chatToDelete._id} between users ${userId} and ${friendId}`);
      await Chat.findByIdAndDelete(chatToDelete._id);
      
      // If users have chatroom references in their documents, remove those too
      if (user.chatroom) {
        user.chatroom = user.chatroom.filter(
          (chatId) => chatId.toString() !== chatToDelete._id.toString()
        );
      }
      
      if (friend.chatroom) {
        friend.chatroom = friend.chatroom.filter(
          (chatId) => chatId.toString() !== chatToDelete._id.toString()
        );
      }
      
      // Emit specific event for chat deletion
      io.emit("chat_deleted", {
        chatId: chatToDelete._id,
        chatroom: chatToDelete.chatroom,
        participants: [userId, friendId]
      });
    }
    
    await user.save();
    await friend.save();

    // Emit friend removed event with both user IDs
    io.emit("friend_removed", {
      userId,
      friendId,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      friend: {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
      },
    });

    res
      .status(200)
      .json({ 
        message: "Friend removed successfully and chat deleted", 
        user, 
        friend,
        deletedChat: chatToDelete ? chatToDelete._id : null
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing friend" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email phone avatar activity");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};
export const getUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Correcting the findById query by passing userId directly
    const user = await User.findById(userId); // Pass userId directly, not as an object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};
