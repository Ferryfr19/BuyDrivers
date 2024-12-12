import React from 'react';
import './css/Footer.css'; // Archivo CSS para estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} BuyDrivers. Todos los derechos reservados.</p>
      <nav>
        <ul className="footer-links">
          <li><a href="#about">Sobre Nosotros</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><a href="#privacy">Política de Privacidad</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
