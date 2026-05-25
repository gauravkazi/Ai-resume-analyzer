import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const test = async () => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent("Say hello");
    const response = await result.response;

    console.log(response.text());
  } catch (err) {
    console.log("ERROR:", err.message);
  }
};

test();