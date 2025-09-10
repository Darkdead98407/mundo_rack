import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaStore } from "react-icons/fa";
import "../styles/header.css"; // Importa solo el CSS del header

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="logo-wrapper">
          <div className="logo-icon">
            <FaStore size={24} />
          </div>
          <div className="logo-texts">
            <h1 className="logo-title">Mundo Rack</h1>
            <p className="logo-subtitle">Exhibiciones para tiendas</p>
          </div>
        </div>



        {/* Navegación */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#productos" onClick={() => setMenuOpen(false)}>Productos</a>
          <a href="#mas-vendidos" onClick={() => setMenuOpen(false)}>Más Vendidos</a>
          <a href="#categorias" onClick={() => setMenuOpen(false)}>Categorías</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>

        {/* Acciones */}
        <div className="header-actions">
          <select className="currency-selector">
            <option>Bs</option>
            <option>$</option>
          </select>
          <button className="cart-btn">
            <FaShoppingCart />
            <span className="cart-text">Carrito</span>
            <span className="cart-count">0</span>
          </button>
                  {/* Botón menú móvil */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
        </div>
      </div>
    </header>
  );
}
