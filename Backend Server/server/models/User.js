import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  password:  { type: String, required: true },
  activity:  { type: Boolean, default: false },
  avatar:    { type: String, default: 'https://example.com/default-avatar.png' }, //this later will be changed to a default avatar image
  friends:         { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  friendsSent:    { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  friendsReceived:{ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  groups:          { type: [String], default: [] },
  groupsOwned:    { type: [String], default: [] },
  chatroom:       { type: [String], default: [] },
});

const User = mongoose.model('User', userSchema);
export default User;
