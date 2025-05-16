import multer from "multer";
import fs from "fs";
import User from "../models/User.js"; // make sure to add .js extension here too
import { io } from "../server.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.userId; // assuming you have user info in req.user (after auth middleware)
    const filePath = `/uploads/${req.file.filename}`;
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      // Delete the uploaded file if user doesn't exist
      fs.unlink(path.join(__dirname, "..", filePath), (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
      return res.status(404).json({ error: "User not found" });
    }

    // Remove previous avatar file if exists and is in uploads folder
    if (user.avatar && user.avatar.includes("/uploads/")) {
      // Extract relative path from full URL
      const oldAvatarRelativePath = user.avatar.split("localhost:3000")[1]; // "/uploads/abc.png"

      // Construct absolute path on the server filesystem
      const oldAvatarPath = path.join(__dirname, "..", oldAvatarRelativePath);

      fs.unlink(oldAvatarPath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Failed to delete old avatar:", err);
        }
      });
    }

    // Update user avatar path and save
    user.avatar = `http://localhost:3000` + filePath;
    io.emit("user_update", { userId: req.user.userId});
    await user.save();

    res.json({ avatar: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { upload, uploadAvatar };
