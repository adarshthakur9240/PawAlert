import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeImage = async (req, res) => {
  try {
    const { image, description } = req.body;
    if (!image) return res.status(400).json({ message: "No image provided" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
    ]);

    const text = result.response.text();
    // Clean text from any markdown tags
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.json(data);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      species: "Animal", 
      urgency: "High", 
      medicationAdvice: "AI analysis failed. Immediate Vet visit recommended.",
      firstAid: "Clean wound with antiseptic and keep animal warm."
    });
  }
};
