import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatRoom: { type: String, required: true },
  isGroup: { type: Boolean, required: true },
  chat: [
    {
      id: { type: Number, required: true},
      user: { type: String, required: true },
      avatar: { type: String, required: true },
      message: { type: String, required: true },
      isOwn: { type: Boolean, required: true },
      time: { type: String, required: true },
    }
  ],
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;