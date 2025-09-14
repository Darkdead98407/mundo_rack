import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
        return res.status(400).json({ error: "Falta el mensaje" });
    }


    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const personality = "Responde como un asesor de Mundo Rack, amable y preciso.";
    const baseInfo = "Aquí colocas la info de tu archivo .txt o base de conocimiento.";

    const prompt = `
    Personalidad: ${personality}
    Información: ${baseInfo}
    Usuario: ${message}
    `;

    const result = await model.generateContent(prompt);

    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({ reply: "Error interno en el servidor." });
  }
}
