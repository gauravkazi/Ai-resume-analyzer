import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume, getHistory } from "../controllers/resumeController.js";
import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/history", protect, getHistory);

export default router;