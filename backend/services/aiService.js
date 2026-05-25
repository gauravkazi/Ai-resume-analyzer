import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") }); // go up one level to backend root

console.log("AI SERVICE KEY =>", process.env.GEMINI_API_KEY);
//
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
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

  const result = await model.generateContent(prompt);
  const response = await result.response;

  let output = response.text();

  output = output.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(output);
    console.log("PARSED RESULT =>", JSON.stringify(parsed)); // add this
    return parsed;
  } catch (err) {
    console.log("RAW OUTPUT =>", output); // add this too
    return {
      atsScore: 0,
      skills: [],
      missingSkills: [],
      suggestions: ["Failed to parse AI response"],
      summary: output,
    };
  }
};
