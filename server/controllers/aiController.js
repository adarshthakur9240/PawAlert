import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeImage = async (req, res) => {
  try {
    const { image, description } = req.body;
    if (!image) return res.status(400).json({ error: "No image provided" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const base64Data = image.split(",")[1] || image;

    const prompt = `
      Analyze this animal photo for PawAlert India. 
      User provided description: "${description || "none"}". 
      Tasks:
      1. Identify the species.
      2. Assess urgency (low/medium/high) based on any visible injury.
      3. Provide 3 short, immediate first-aid/medication advice points.
      Return ONLY a valid JSON object:
      {
        "species": "dog/cat/cattle/bird/other", 
        "urgency": "low/medium/high",
        "medicationAdvice": "Step 1... Step 2... Step 3..."
      }
    `;

    const result = await model.generateContent([
      { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
      { text: prompt },
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    console.log("AI Scan Result ✅:", data);
    res.json(data);
  } catch (error) {
    console.error("🚨 AI ERROR:", error.message);
    res.status(500).json({ error: "AI Scan failed.", debug: error.message });
  }
};

export const analyzeDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze injury description: "${description}". 
    Return ONLY JSON: {"species": "dog/cat/cattle/bird/other", "urgency": "low/medium/high", "medicationAdvice": "First aid steps..."}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    res.json(JSON.parse(jsonMatch ? jsonMatch[0] : text));
  } catch (error) {
    res.status(500).json({ error: "Text analysis failed" });
  }
};
