import fs from "fs";
import PDFParser from "pdf2json";
import { analyzeResume } from "../services/aiService.js";
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfParser = new PDFParser();
    pdfParser.loadPDF(req.file.path);

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      try {
        const rawText = pdfParser.getRawTextContent();
        const cleanText = rawText.replace(/\s+/g, " ").trim();
        const aiResult = await analyzeResume(cleanText);

        const resume = await Resume.create({
          user: req.user._id,
          fileName: req.file.originalname,
          analysis: JSON.stringify(aiResult),
          score: aiResult.atsScore || "N/A",
        });

        return res.json({
          message: "Resume analyzed successfully",
          aiResult,
          resume,
        });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      return res.status(500).json({ message: err.parserError });
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
