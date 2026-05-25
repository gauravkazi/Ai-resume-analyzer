import Analysis from "../models/Analysis.js";
import extractTextFromPDF from "../services/pdfService.js";
import { analyzeResume } from "../services/aiService.js";

export const analyzeResumeController = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const resumeText = await extractTextFromPDF(req.file.path);

    const result = await analyzeResume(
      resumeText,
      jobDescription
    );

    const savedAnalysis = await Analysis.create({
      user: req.user._id,
      ...result,
    });

    res.status(200).json(savedAnalysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user._id });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};