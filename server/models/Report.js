import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reporterName: { type: String, required: true },
  phone: { type: String },
  animalType: { type: String, required: true },
  urgency: { type: String, enum: ["low", "medium", "high"], default: "low" },
  location: { type: String, required: true },
  coordinates: { lat: { type: Number }, lng: { type: Number } },
  description: { type: String },
  photo: { type: String },
  aiAdvice: { type: String },
  aiMeds: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "rescued", "sheltered", "adopted", "zoo", "failed"], 
    default: "pending" 
  },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
