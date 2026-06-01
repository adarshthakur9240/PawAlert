import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "PawAlert Server is live 🐾" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
// OckhamGrid Stress Test - O(N^2)
app.get('/api/test-optimization', (req, res) => {
    const data = [1, 2, 3, 4, 5, 1, 2];
    let duplicates = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i] === data[j]) {
                duplicates.push(data[i]);
            }
        }
    }
    res.json({ duplicates });
});