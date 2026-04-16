import express from "express";
import {
  createReport,
  getReports,
  upvoteReport,
  updateStatus,
  // updateReport // ❌ Abhi ke liye ise comment kar diya hai taaki error na aaye
} from "../controllers/reportController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getReports);

// Protected routes (Login zaroori hai)
router.post("/", auth, createReport);
// router.put("/:id", auth, updateReport); // ❌ Ise bhi comment kar diya hai
router.put("/:id/upvote", upvoteReport);
router.put("/:id/status", auth, updateStatus);

export default router;
