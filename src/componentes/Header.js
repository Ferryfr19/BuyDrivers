import React from 'react';
import './css/Header.css'; // Importa el archivo de estilos desde la subcarpeta css

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">BuyDrivers</div>
        <nav>
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#Vendedores destacados">Vendedores destacados</a></li>
            <li><a href="#Gestion de ventas">Gestión de ventas</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;