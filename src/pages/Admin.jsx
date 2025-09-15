import { useState, useEffect } from "react";
import "../styles/Admin.css";
import "../styles/Card.css";

function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    nombre: "", 
    precio: "", 
    stock: 1, 
    imagenFrente: "",
    imagenDetras: "" 
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {

    try {
    const res = await fetch("/api/productos");
    const data = await res.json();

    if (Array.isArray(data)) {
      setProductos(data);
    } else {
      console.error("Datos de productos inválidos:", data);
      setProductos([]);
    }    
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Manejo de imagen subida
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, [e.target.name]: reader.result, [`${e.target.name}File`]: file});
    };
    reader.readAsDataURL(file);
  }

  // Guardar o actualizar producto
  async function guardarProducto(e) {
    e.preventDefault();

    try {

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("precio", form.precio);
    formData.append("stock", form.stock);

    if (form.FrenteFile) {
      formData.append("Frente", form.FrenteFile);
    }
    if (form.DetrasFile) {
      formData.append("Detras", form.DetrasFile);
    }

    const method = editIndex !== null ? "PUT" : "POST";
    const url =
      editIndex !== null
        ? `/api/productos/${productos[editIndex].id}`
        : "/api/productos";

    await fetch(url, {
      method,
      body: formData,
    });

    cargarProductos();
    setForm({ nombre: "", precio: "", stock: 1, Frente: "", Detras: "" });
    setEditIndex(null);
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    alert("Error al guardar el producto. Revisa la consola para más detalles.");
  }
}

  async function eliminarProducto(id) {

    try {
    await fetch(`/api/productos/${id}`, { 
      method: "DELETE",
    });
    cargarProductos();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
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
        <div className="body-login">
        <div className="form-containerr">
          <h2 className="title">{editIndex !== null ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>
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
            <div>
              <label htmlFor="imagenFrente-upload" className="custum-file-upload">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path>
                  </g>
                 </svg>
                </div>
                <div className="text">
                  <span>Haz clic para subir imagen (Frente)</span>
                </div>
                <input id="imagenFrente-upload" type="file" name="Frente" accept="image/*" onChange={handleImageUpload} />  
              </label>
                <span className="file-name-display">
                  {form.imagenFrente ? "Archivo Cargado" : "Ningún archivo seleccionado"}
                </span>
                  {form.imagenFrente && (
                    <img src={form.imagenFrente} alt="Preview Frente" className="card__image" />
                  )} 
            </div>

            <div>
              <label htmlFor="imagenDetras-upload" className="custum-file-upload">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path>
                  </g>
                 </svg>                  
              </div>
              <div className="text">
                  <span>Haz clic para subir imagen (Detrás)</span>
                </div>
                <input id="imagenDetras-upload" type="file" name="Detras" accept="image/*" onChange={handleImageUpload} />
              </label>
              <span className="file-name-display">
                  {form.imagenDetras ? "Archivo Cargado" : "Ningún archivo seleccionado"}
                </span>
                  {form.imagenDetras && (
                  <img src={form.imagenDetras} alt="Preview Detras" className="card__image" />
                )}                        
            </div>
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
      <div className="body-login">
      <div className="form-container">
        <p className="title">Acceso Administracion</p>
        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="******"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          </div>
          <button type="submit" className="sign">Entrar</button>
        </form>
      </div>
      </div>
    );
  }

  return <AdminPanel onLogout={handleLogout} />;
}
