import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: true,
  },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  lastMessage: {
    message: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    time: { type: Date, required: true },
  },
  chat: {
    type: [
      {
        id: { type: String, default: uuidv4 },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        avatar: { type: String, required: true },
        message: { type: String, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
