import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../server/credenciales';
import logoCoche from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/logocoche.png';
import loginIcon from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/login-icon.png'; 
import './css/Header.css'; 

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleBienvenidoClick = () => {
    navigate('/perfil-usuario');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoCoche} alt="Logo coche" className="logo-coche" />
        <span className="logo-text">BuyDrivers</span>
      </div>
      <nav>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/vendedores-destacados">Vendedores destacados</Link></li>
          <li><Link to="/gestion-ventas">Gestión de ventas</Link></li>
        </ul>
      </nav>
      <div className="login">
        <img src={loginIcon} alt="Login Icon" className="login-icon" />
        {user ? (
          <span 
            onClick={handleBienvenidoClick} 
            style={{cursor: 'pointer'}}
          >
            Bienvenido
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;


