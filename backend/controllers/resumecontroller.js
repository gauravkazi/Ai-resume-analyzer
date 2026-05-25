import fs from "fs";
import PDFParser from "pdf2json";
import { analyzeResume } from "../services/aiService.js";

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

        return res.json({
          message: "Resume analyzed successfully",
          aiResult,
        });
      } catch (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      return res.status(500).json({
        message: err.parserError,
      });
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};