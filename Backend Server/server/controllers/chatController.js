import Chat from "../models/Chat.js";

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
