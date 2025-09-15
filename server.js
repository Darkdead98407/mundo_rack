// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import productosRouter from "./api/Productos.js";
import Chat from "./api/chat.js";

const app = express();

// Config base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json()); // Aumentar límite para imágenes en base64
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/productos", productosRouter);
app.use("/api/chat", Chat);

// Producción: servir frontend de Vite
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
