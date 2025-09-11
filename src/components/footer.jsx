import React from "react"
import "../styles/footer.css";
import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaStore } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="grid">
        <div className="logo-wrapper">
          <div className="logo-icon">
            <FaStore size={24}/>
          </div>
          <div>
            <h1 className="logo-title">Mundo Rack</h1>
            <p className="logo-subtitle">Tu socio confiable para equipos de exhibición en Venezuelas</p>
          </div>
        </div>

        <div>
          <h5>Productos</h5>
          <ul>
            <li><a href="#">Percheros</a></li>
            <li><a href="#">Ganchos</a></li>
            <li><a href="#">Espejos</a></li>
            <li><a href="#">Maniquíes</a></li>
            <li><a href="#">Accesorios</a></li>
          </ul>
        </div>

        <div>
          <h5>Empresa</h5>
          <ul>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h5>Contacto</h5>
          <div className="contact-info">
            <FiPhone size={16} /> +58 (424) 443-2847
          </div>
          <div className="contact-info">
            <CiMail size={16} /> info@mundorack.com.ve
          </div>
          <div className="contact-info">
            <FiMapPin size={16} /> Valencia, Venezuela
          </div>
        </div>
        <div>
          <h2  className="title-social">Encuéntranos y síguenos:</h2>

          <div className="social-links-container">
        <a 
          href="https://www.instagram.com/mundo_rackk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
          className="social-link"
        >
          <FaInstagram size={20} className="social-link"/>
        </a>
        <a 
          href="https://www.facebook.com/profile.php?id=61578778537891" 
          className="social-link"
        >
          <FaFacebook size={20} className="social-link"/>
        </a>
        <a 
          href="https://api.whatsapp.com/send?phone=584125070646&text=Hola%20buenas%20tardes%20quiero%20mas%20informacion%20sobre%20sus%20productos" 
          className="social-link"
        >
          <FaWhatsapp size={20} className="social-link"/>
        </a>
        <a
          href="https://www.tiktok.com/@mundorack_www.tiktok.com?is_from_webapp=1&sender_device=pc"
          className="social-link"
        >
          <FaTiktok size={20} className="social-link" />
        </a>
      </div>
        </div>

      
      </div>

      <div className="copyright-container" style={{ textAlign: "center", marginTop: "2rem" }}>
        <p className="copyright-text">© 2024 Mundo Rack Venezuela. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
