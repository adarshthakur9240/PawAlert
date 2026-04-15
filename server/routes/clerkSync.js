import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/clerk-sync", async (req, res) => {
  try {
    const { email, name, clerkId, userType } = req.body;

    // 1. Check karo user pehle se hai ya nahi (Email se)
    let user = await User.findOne({ email });

    if (!user) {
      // 2. Agar nahi hai, toh naya banao (Social login style)
      user = await User.create({
        email,
        name,
        clerkId, // Clerk ki ID track karne ke liye
        role: userType || "citizen", 
        password: Math.random().toString(36).slice(-10), // Dummy password
      });
    }

    // 3. Apna purana JWT generate karo (Jo tera backend verify kar sake)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Sync Failed", error: error.message });
  }
});

export default router;
