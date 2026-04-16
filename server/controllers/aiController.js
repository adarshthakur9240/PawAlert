import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Helper function to get model with safety settings
const getPawAlertModel = (genAI) => {
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // Stable model name
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
  });
};

// 1. IMAGE ANALYZE WALA FUNCTION
export const analyzeImage = async (req, res) => {
  try {
    const { image, description } = req.body;
    if (!image) return res.status(400).json({ message: "No image provided" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = getPawAlertModel(genAI);

    // Extract Base64 data correctly
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

    const text = result.response.text();
    // Remove markdown code blocks if AI includes them
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.json(data);
  } catch (error) {
    console.error("Gemini Image Error Details:", error);
    res.status(500).json({
      species: "Animal",
      urgency: "High",
      medicationAdvice: "AI analysis failed. Immediate Vet visit recommended.",
      firstAid: "Clean wound with antiseptic and keep animal warm.",
    });
  }
};

// 2. TEXT ANALYZE WALA FUNCTION
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
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.json(data);
  } catch (error) {
    console.error("Gemini Text Error Details:", error);
    res.status(500).json({
      species: "Unknown",
      urgency: "High",
      medicationAdvice: "AI analysis failed. Immediate Vet visit recommended.",
      firstAid: "Keep the animal safe and contact a local vet.",
    });
  }
};
