import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { inputRequired } = req.body;

    if (!inputRequired) {
      return res.status(400).json({ error: "Missing inputRequired" });
    }

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Calling Gemini with:", inputRequired);

    const result = await model.generateContent(inputRequired);
    const response = await result.response;
    const text = await response.text();

    console.log("Gemini Response:", text);
    res.status(200).send(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).send("Something went wrong.");
  }
}