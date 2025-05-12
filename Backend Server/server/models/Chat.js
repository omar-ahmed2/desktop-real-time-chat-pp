import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatroom: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isGroup: { type: Boolean, required: true },
  chat: [
    {
      id: { type: Number, required: true},
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      avatar: { type: String, required: true },
      message: { type: String, required: true },
      isOwn: { type: Boolean, required: true },
      time: { type: String, required: true },
    }
  ],
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;