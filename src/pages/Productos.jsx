import { useEffect, useState } from "react";
import "../styles/Card.css"; // en vez de Productos.css
import "../styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  return (
    <section id="productos" className="productos-section">
      <h2>Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((p) => (
            <div key={p.id} className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {p.stock <= 0 && (
              <div className="card__badge" style={{ background: "red" }}>
                Agotado
              </div>
            )}
            <img src={p.imagenFrente} alt={p.nombre} className="card__image" />
            </div>

          <div className="flip-card-back">
            <img src={p.imagenDetras} alt={p.nombre} className="card__image" />
          </div>
        </div>
          <div className="producto-info">
            <h3>{p.nombre}</h3>
            <p>Precio: Bs {p.precio}</p>
            <p>Stock: {p.stock}</p>
          </div>
        </div>


          ))
        ) : (
          <div className="productos-container">
            <img src="/products.gif" alt="No hay productos disponibles" />
            <p>No hay productos disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}
