import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint para chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Personalidad + base de datos en TXT
    const baseInfo = "Aquí pegas o cargas tu base de conocimiento en texto...";
    const personality = "Responde siempre como un asesor de Mundo Rack: amable, rápido y claro.";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Personalidad: ${personality}
    Información: ${baseInfo}
    Usuario: ${message}
    `;

    const result = await model.generateContent(prompt);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error al procesar tu mensaje." });
  }
});

app.listen(3001, () => console.log("✅ Servidor corriendo en http://localhost:3001"));
