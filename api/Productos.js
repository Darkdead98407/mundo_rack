import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "productos.json");
const upload = multer({ dest: "uploads/" }); // guarda imágenes en /uploads
 // simulación en memoria (luego se conecta a BD)

//Obtener productos
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, "[]", "utf-8");
    }
    const data = fs.readFileSync(dataPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("Error detallado:", err);
    res.status(500).json({ error: "Error al leer productos" });
  }
});

// Crear producto
router.post("/", upload.fields([{ name: 'Frente' }, { name: 'Detras'}]), (req, res) => {
  try {
    const producto = {
      id: uuidv4(),
      ...req.body,
      imagenFrente: `/uploads/${req.files.Frente[0].filename}`,
      imagenDetras: `/uploads/${req.files.Detras[0].filename}`
    };
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
data.push(producto);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
res.json(producto);
} catch (err) {
  res.status(500).json({ error: "Error al crear producto" });
}
});

// Actualizar producto
router.put("/:id", upload.fields([{ name: 'Frente' }, { name: 'Detras' }]), (req, res) => {
  try {
    const { id } = req.params;
    let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    let imagenFrentePath = req.body.imagenFrente;
    if (req.files.imagenFrente) {
      imagenFrentePath = `/uploads/${req.files.Frente[0].filename}`;
    }

    let imagenDetrasPath = req.body.imagenDetras;
    if (req.files.imagenDetras) {
      imagenDetrasPath = `/uploads/${req.files.Detras[0].filename}`;
    }
    data = data.map((p) =>
      p.id === id ? { ...p, ...req.body, imagenFrente: imagenFrentePath, imagenDetras: imagenDetrasPath } : p
  );
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json({ success: true});
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar producto
router.delete("/:id", (req, res) => {
  try {
    const {id} = req.params;
    let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    data = data.filter((p) => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
})

export default router;
