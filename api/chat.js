// api/chat.js
import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const app = express();
app.use(bodyParser.json());

function leerPersonalidad() {
  try {
    const personalidadPath = path.join(process.cwd(), "personalidad.txt");
    if (fs.existsSync(personalidadPath)) {
      return fs.readFileSync(personalidadPath, "utf-8");
    }
    return "Eres un asesor amigable y profesional de Mundo Rack, especializado en Percheros para exhibiciones en tiendas eres amable y profesional.";
  } catch (error) {
    console.error("❌ Error al leer personalidad:", error);
    return "Eres un asesor amigable y profesional de Mundo Rack, especializado en Percheros para exhibiciones en tiendas eres amable y profesional.";
  }
}

function info() {
  try {
    const infoPath = path.join(process.cwd(), "info.txt");
    if (fs.existsSync(infoPath)) {
      return fs.readFileSync(infoPath, "utf-8");
    }
    return "";
  } catch (error) {
    console.error("❌ Error al leer info:", error);
    return "";
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Falta el mensaje" });

    const personalidad = leerPersonalidad();
    const informacion = info();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      ${personalidad}
      
      ${informacion ? `INFORMACIÓN SOBRE PRODUCTOS:\n${informacion}\n\n` : ''}
      
      Responde al usuario de manera amable y profesional. 
      Si preguntan sobre productos que no conoces, sugiere que se contacten directamente.
      
      Mensaje del usuario: ${message}
    `;

    const result = await model.generateContent(prompt);

    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("❌ Error en el servidor:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default app;
