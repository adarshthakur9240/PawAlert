import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import clerkSyncRoutes from "./routes/clerkSync.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

const app = express();

app.use(cors({
  origin: [
    "https://paw-alert-ten.vercel.app",
    "https://paw-alert-7xz35sef2-adarshthakur9240s-projects.vercel.app",
    "https://paw-alert-git-main-adarshthakur9240s-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/auth", clerkSyncRoutes); 
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.json({ message: "PawAlert Server is live 🐾" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
