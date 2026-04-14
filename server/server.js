import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

const app = express();

// --- UPDATED CORS CONFIGURATION ---
app.use(
  cors({
    origin: ["https://paw-alert-ten.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS zaroori hai pre-flight requests ke liye
    allowedHeaders: ["Content-Type", "Authorization"], // Authorization header allow karna padega
    credentials: true,
  }),
);
// ----------------------------------

app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.json({ message: "PawAlert Server is live 🐾" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
