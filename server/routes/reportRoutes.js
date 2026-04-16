import express from "express";
import {
  createReport,
  getReports,
  upvoteReport,
  // updateStatus, // ❌ Isko bhi comment kar diya
  // updateReport  // ❌ Ye pehle se commented hai
} from "../controllers/reportController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getReports);

// Protected routes (Login zaroori hai)
router.post("/", auth, createReport);
// router.put("/:id", auth, updateReport); // ❌ Commented
router.put("/:id/upvote", upvoteReport);
// router.put("/:id/status", auth, updateStatus); // ❌ Route bhi comment kar diya

export default router;
