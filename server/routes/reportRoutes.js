import express from "express";
import {
  createReport,
  getReports,
  // upvoteReport, // ❌ Not yet in controller
  // updateStatus, // ❌ Not yet in controller
  // updateReport  // ❌ Not yet in controller
} from "../controllers/reportController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getReports);

// Protected routes (Login zaroori hai)
router.post("/", auth, createReport);

// ❌ Niche ke saare routes comment kar diye jab tak inka code backend me na likh jaye:
// router.put("/:id", auth, updateReport);
// router.put("/:id/upvote", upvoteReport);
// router.put("/:id/status", auth, updateStatus);

export default router;
