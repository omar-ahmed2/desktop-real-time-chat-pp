import User from "../models/User.js"; // Assuming you have a User model
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
    } else {
      // Send new request
      friend.friendsReceived.push(userId);
      user.friendsSent.push(friendId);
    }
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend request sent successfully",user,friend});
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
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend removed successfully",user,friend});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing friend" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email phone avatar");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};
