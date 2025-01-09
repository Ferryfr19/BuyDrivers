import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import logoCoche from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/logocoche.png';
import loginIcon from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/login-icon.png'; 
import './css/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoCoche} alt="Logo coche" className="logo-coche" />
        <span className="logo-text">BuyDrivers</span>
      </div>
      <nav>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li> {/* Usa Link para la navegación */}
          <li><Link to="/vendedores-destacados">Vendedores destacados</Link></li>
          <li><Link to="/gestion-ventas">Gestión de ventas</Link></li>
        </ul>
      </nav>
      <div className="login">
        <img src={loginIcon} alt="Login Icon" className="login-icon" />
        <Link to="/login">Login</Link> {/* Usa Link también para el login */}
      </div>
    </header>
  );
};

export default Header;

