import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PDFParser = require("pdf2json");

const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(" ")
      ).join("\n");
      resolve(text);
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.loadPDF(filePath);
  });
};

export default extractTextFromPDF;