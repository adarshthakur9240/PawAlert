import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 🔥 UPDATED: Added 'admin' to the enum
  role: { 
    type: String, 
    enum: ["citizen", "government", "ngo", "admin"], 
    default: "citizen" 
  },
  phone: { type: String },
  city: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);