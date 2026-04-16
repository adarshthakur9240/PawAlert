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

// ✅ FIX: Sabhi possible domains ko allow karo (Custom + Vercel + Local)
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://pawalert.in",
        "https://www.pawalert.in",
        "https://paw-alert-ten.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
      ];
      // Allow any defined URL or Vercel preview branch URL
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// 👇 YAHAN HAI WO NAYA FIX (10MB hata kar 50MB kar diya dono ke liye) 👇
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// 👆 ============================================================= 👆

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/auth", clerkSyncRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.json({ message: "PawAlert Server is live 🐾" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
