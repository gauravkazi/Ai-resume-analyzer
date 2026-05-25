import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("GEMINI KEY =>", process.env.GEMINI_API_KEY); // remove after confirming it works

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});