import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// 🛠️ Stable Model Configuration
const MODEL_NAME = "gemini-1.5-flash";

const getPawAlertModel = (genAI) => {
  return genAI.getGenerativeModel(
    {
      model: MODEL_NAME,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    },
    { apiVersion: "v1" },
  ); // 🔥 CRITICAL: Beta ki jagah Stable v1 force kiya
};

// 1. IMAGE ANALYZE FUNCTION
export const analyzeImage = async (req, res) => {
  try {
    const { image, description } = req.body;
    if (!image) return res.status(400).json({ message: "No image provided" });

    // API Key check
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = getPawAlertModel(genAI);

    const base64Data = image.split(",")[1] || image;

    const prompt = `
      Instructions: You are a professional Vet. Analyze the injured animal image.
      User context: ${description || "General injury"}
      
      CRITICAL: Return ONLY a valid JSON object. No markdown, no extra text.
      JSON Structure:
      {
        "species": "identify animal (Dog/Cat/Cow/etc)",
        "urgency": "High/Medium/Low",
        "medicationAdvice": "short medical explanation",
        "firstAid": "step by step first aid"
      }
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.json(data);
  } catch (error) {
    console.error("🚨 Gemini Image Error Details:", error.message);
    res.status(500).json({
      species: "Animal",
      urgency: "High",
      medicationAdvice: "AI analysis failed. Immediate Vet visit recommended.",
      firstAid: "Clean wound with antiseptic and keep animal warm.",
      error: error.message, // Debugging ke liye
    });
  }
};

// 2. TEXT ANALYZE FUNCTION
export const analyzeDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description)
      return res.status(400).json({ message: "No description provided" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = getPawAlertModel(genAI);

    const prompt = `
      Instructions: You are a professional Vet. Analyze the following injury description for a stray animal.
      Description: ${description}
      
      CRITICAL: Return ONLY a valid JSON object. No markdown, no extra text.
      JSON Structure:
      {
        "species": "Unknown (or guess from text)",
        "urgency": "High/Medium/Low",
        "medicationAdvice": "short medical explanation",
        "firstAid": "step by step first aid"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.json(data);
  } catch (error) {
    console.error("🚨 Gemini Text Error Details:", error.message);
    res.status(500).json({
      species: "Unknown",
      urgency: "High",
      medicationAdvice: "AI analysis failed. Immediate Vet visit recommended.",
      firstAid: "Keep the animal safe and contact a local vet.",
    });
  }
};
