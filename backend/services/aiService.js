import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") }); 

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry helper: retries the Gemini call if it fails with a 503 (high demand)
const generateWithRetry = async (model, prompt, retries = 3, delayMs = 2000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (err) {
      const is503 = err?.status === 503 || err?.message?.includes("503") || err?.message?.includes("overloaded") || err?.message?.includes("high demand");

      if (is503 && attempt < retries) {
        console.log(`Gemini overloaded (attempt ${attempt}/${retries}), retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2; // exponential backoff: 2s, 4s, 8s...
        continue;
      }

      throw err; // not a 503, or out of retries — bubble up the real error
    }
  }
};

export const analyzeResume = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.8-flash",
  });

  const prompt = `
You are an expert ATS resume analyzer.

Return ONLY valid JSON. No markdown. No explanation.

Schema:
{
  "atsScore": number,
  "skills": string[],
  "missingSkills": string[],
  "suggestions": string[],
  "summary": string
}

Resume:
${text}
`;

  const result = await generateWithRetry(model, prompt);
  const response = await result.response;

  let output = response.text();

  output = output.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(output);
    console.log("PARSED RESULT =>", JSON.stringify(parsed));
    return parsed;
  } catch (err) {
    console.log("RAW OUTPUT =>", output);
    return {
      atsScore: 0,
      skills: [],
      missingSkills: [],
      suggestions: ["Failed to parse AI response"],
      summary: output,
    };
  }
};