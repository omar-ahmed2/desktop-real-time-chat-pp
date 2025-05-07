import express from "express";
import mongoose from "mongoose";
import Chat from "./chat.js";

const router = express.Router();
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

mongoose.connect("mongodb://localhost:27017/chatapp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/send", async (req, res) => {
  const newChat = new Chat({
    chatRoom: "room1",
    isGroup: false, 
    chat: [
      {
        id: 1,
        user: "Sarah Parker",
        avatar: "/images/picProfile.png",
        message:
          "Hey team! I've finished the initial designs for the new project. Take a look when you can.",
        time: "10:32 AM",
        isOwn: false,
      },
      {
        id: 2,
        user: "John Doe",
        avatar: "/images/picProfile.png",
        message: "Great work Sarah! The color scheme looks perfect 👍",
        time: "10:35 AM",
        isOwn: true,
      },
    ],
  });

try {
    await newChat.save();
    res.send("Message saved!");
} 
catch (err) {
    res.status(500).send("Error saving message");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
export default router;