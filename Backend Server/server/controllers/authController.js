import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { io } from "../server.js";
export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    avatar,
  } = req.body;
  console.log(req.body);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seed = `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "");
    const defaultAvatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(
      seed
    )}`;

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      avatar: avatar || defaultAvatar,
      password: hashedPassword,
      friends: [],
      friendsSent: [],
      friendsReceived: [],
      groups: [],
      groupsOwned: [],
      chatrooms: [],
    });

    await newUser.save();
    console.log("EMITTING");
    io.emit("user_registered", {
      firstName,
      lastName,
      email,
    });
    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating account", error: err });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    user.activity = "true";
    await user.save();
    io.emit("user_update", {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      avatar: user.avatar,
      activity: user.activity,
      email: user.email,
      phone: user.phone,
    });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { userFirstName, userLastName, userEmail, userPhone } = req.body;
    const user = await User.findById(req.user.userId);
    if (!userFirstName && !userLastName && !userPhone && !userEmail) {
      return res
        .status(400)
        .json({ message: "Provide at least name or phone or email" });
    }
    if (userFirstName) {
      user.firstName = userFirstName;
    }
    if (userLastName) {
      user.lastName = userLastName;
    }
    if (userPhone) {
      user.phone = userPhone;
    }
    if (userEmail) {
      user.email = userEmail;
    }
    await user.save();
    io.emit("user_update", {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      avatar: user.avatar,
      activity: user.activity,
      email: user.email,
      phone: user.phone,
    });
    res.status(200).json({ message: "Edited" });
  } catch (e) {
    console.log("an error has occurred:", e);
    res.status(500).json({ message: "Error editing user", error: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!userId) {
      return res.status(400).json({ message: "UserId not found" });
    }
    user.activity = "false";
    await user.save();
    io.emit("user_update", {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      avatar: user.avatar,
      activity: user.activity,
      email: user.email,
      phone: user.phone,
    });
    res.status(200).json({ message: "logged out user" });
  } catch (e) {
    console.log("an error has occured:", e);
    res
      .status(500)
      .json({ message: "Error logining out user", error: err.message });
  }
};
