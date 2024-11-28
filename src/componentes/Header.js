import React from 'react';
import logoCoche from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/logocoche.png';
import loginIcon from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/login-icon.png'; // Asegúrate de que la ruta sea correcta
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
          <li><a href="#home">Inicio</a></li>
          <li><a href="#Vendedores destacados">Vendedores destacados</a></li>
          <li><a href="#Gestion de ventas">Gestión de ventas</a></li>
        </ul>
      </nav>
      <div className="login">
        <img src={loginIcon} alt="Login Icon" className="login-icon" /> {/* Imagen sobre el texto Login */}
        <a href="#login">Login</a>
      </div>
    </header>
  );
};

export default Header;