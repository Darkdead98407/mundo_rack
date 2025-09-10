import { useState } from "react";
import "../styles/Admin.css";

function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productos, setProductos] = useState(
    JSON.parse(localStorage.getItem("productos")) || []
  );
  const [form, setForm] = useState({ nombre: "", precio: "", stock: 1, imagen: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Manejo de inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Manejo de imagen subida
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imagen: reader.result });
    };
    reader.readAsDataURL(file);
  }

  // Guardar o actualizar producto
  function guardarProducto(e) {
    e.preventDefault();
    if (!form.nombre.trim() || form.precio <= 0 || form.stock < 1) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    let nuevos = [...productos];
    if (editIndex !== null) {
      nuevos[editIndex] = { ...form, id: productos[editIndex].id };
      setEditIndex(null);
    } else {
      nuevos.push({ id: Date.now(), ...form });
    }

    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
    setForm({ nombre: "", precio: "", stock: 1, imagen: "" });
  }

  function eliminarProducto(id) {
    let nuevos = productos.filter((p) => p.id !== id);
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
  }

  return (
    <div className="admin-panel">
      <div className="tabs">
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("productos")}>Productos</button>
        <button onClick={() => setActiveTab("pedidos")}>Pedidos</button>
        <button onClick={() => setActiveTab("chats")}>Chats</button>
        <button onClick={() => setActiveTab("ventas")}>Ventas</button>
        <button className="logout" onClick={onLogout}>Cerrar Sesión</button>
      </div>

      {activeTab === "dashboard" && (
        <div className="tab-content">
          <h2>📊 Dashboard</h2>
          <p>Productos totales: {productos.length}</p>
          <p>Pedidos activos: 0</p>
          <p>Chats: 0</p>
          <p>Ventas hoy: 0 Bs</p>
        </div>
      )}

      {activeTab === "productos" && (
        <div className="tab-content">
          <h2>{editIndex !== null ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>
          <form onSubmit={guardarProducto} className="admin-form">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio (Bs)"
              required
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {form.imagen && (
              <img src={form.imagen} alt="Preview" className="preview-img" />
            )}
            <button type="submit">
              {editIndex !== null ? "Actualizar" : "Guardar"}
            </button>
            {editIndex !== null && (
              <button type="button" onClick={() => { setEditIndex(null); setForm({ nombre: "", precio: "", stock: 1, imagen: "" }); }}>
                Cancelar
              </button>
            )}
          </form>

          <h3>📦 Productos existentes</h3>
          <div className="productos-grid">
            {productos.map((p, i) => (
              <div key={p.id} className="producto-card">
                <img src={p.imagen} alt={p.nombre} />
                <h4>{p.nombre}</h4>
                <p>Bs {p.precio}</p>
                <p>Stock: {p.stock}</p>
                <div className="acciones">
                  <button onClick={() => { setEditIndex(i); setForm(p); }}>✏️ Editar</button>
                  <button onClick={() => eliminarProducto(p.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  );
  const [code, setCode] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (code === import.meta.env.VITE_ADMIN_CODE) {
      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);
    } else {
      alert("Código incorrecto");
    }
  }

  function handleLogout() {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
  }

  if (!isAuth) {
    return (
      <div className="login-container">
        <h2>🔐 Acceso Admin</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="password"
            placeholder="Código de acceso"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return <AdminPanel onLogout={handleLogout} />;
}
