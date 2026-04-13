import express from "express";
import { 
  createReport, 
  getAllReports, 
  upvoteReport, 
  updateStatus, 
  updateReport // 🔥 Naya import yahan add ho gaya
} from "../controllers/reportController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllReports);

// Protected routes (Login zaroori hai)
router.post("/", auth, createReport);
router.put("/:id", auth, updateReport); // 🔥 Edit report ka route
router.put("/:id/upvote", upvoteReport);
router.put("/:id/status", auth, updateStatus);

export default router;