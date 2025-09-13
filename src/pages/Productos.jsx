import { useEffect, useState } from "react";
import "../styles/Card.css"; // en vez de Productos.css
import "../styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  return (
    <section id="productos" className="productos-section">
      <h2>Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((p) => (
            <div key={p.id} className="card">
              <div className="card__shine"></div>
              <div className="card__glow"></div>
              <div className="card__content">
                {p.stock > 0 ? (
                  <div className="card__badge">NEW</div>
                ) : (
                  <div className="card__badge" style={{ background: "red" }}>
                    Sin stock
                  </div>
                )}
                <div className="card__image" style={{ backgroundImage: `url(${p.imagen})`, backgroundSize: "cover" }}></div>
                <div className="card__text">
                  <p className="card__title">{p.nombre}</p>
                  <p className="card__description">Stock: {p.stock}</p>
                </div>
                <div className="card__footer">
                  <div className="card__price">Bs {p.precio}</div>
                  <div className="card__button">
                    <svg height="16" width="16" viewBox="0 0 24 24">
                      <path
                        strokeWidth="2"
                        stroke="currentColor"
                        d="M4 12H20M12 4V20"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
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
