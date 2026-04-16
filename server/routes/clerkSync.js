import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/clerk-sync", async (req, res) => {
  try {
    const { email, name, clerkId, userType } = req.body;

    // 0. Validation: Pata chala bina data ke request aa gayi
    if (!email || !clerkId) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Clerk ID are required" });
    }

    // 1. Check karo user pehle se hai ya nahi (Email se)
    let user = await User.findOne({ email });

    if (!user) {
      // 2. Agar nahi hai, toh naya banao
      user = await User.create({
        email,
        name: name || "PawAlert User", // Fallback name agar Google se naam na mile
        clerkId,
        role: userType || "citizen",
        password: Math.random().toString(36).slice(-10), // Dummy password
      });
    } else {
      // 3. Agar user ka account pehle se hai, par Clerk ID nahi judi hai (Old users), toh update kar do
      if (!user.clerkId) {
        user.clerkId = clerkId;
        await user.save();
      }
    }

    // 4. Apna purana JWT generate karo (Jo tera backend verify kar sake)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ success: true, token, user });
  } catch (error) {
    console.error("Clerk Sync Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Sync Failed", error: error.message });
  }
});

export default router;
