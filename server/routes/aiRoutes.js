import express from "express";
import { analyzeDescription, analyzeImage } from "../controllers/aiController.js";

const router = express.Router();
router.post("/analyze", analyzeDescription);
router.post("/analyze-image", analyzeImage);

export default router;