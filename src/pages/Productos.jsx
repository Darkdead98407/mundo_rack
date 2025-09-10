import { useEffect, useState } from "react";
import "../styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  return (
    <section id="productos" className="productos-section">
      <h2>🛍️ Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((p) => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p className="precio">$ {p.precio}</p>
              <button className="btn-agregar">Agregar al carrito</button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
}
