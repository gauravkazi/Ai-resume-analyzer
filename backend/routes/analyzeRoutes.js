import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  analyzeResumeController,
  getHistory,
} from "../controllers/analyzeController.js";

const router = express.Router();

// Analyze resume (with file upload)
router.post(
  "/resume",
  protect,
  upload.single("resume"),
  analyzeResumeController
);

// Get history
router.get("/history", protect, getHistory);

// Test route (optional)
router.post("/analyze", analyzeResumeController);

export default router;