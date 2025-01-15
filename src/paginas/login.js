import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import axios from 'axios'; // Importa axios para las solicitudes HTTP
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje de inicio de sesión

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        contraseña: password, // Asegúrate de que el nombre del campo coincida con el del servidor
      });

      if (response.data.message === 'Inicio de sesión exitoso') {
        setMessage('¡Has iniciado sesión!'); // Actualiza el mensaje
      } else {
        setMessage('Error en el inicio de sesión'); // Manejo de errores
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setMessage('Error en el inicio de sesión'); // Manejo de errores
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      {message && <h2>{message}</h2>} {/* Muestra el mensaje si existe */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <div className="register-link">
        {/* Enlace a la página de registro */}
        <p>
          ¿No tienes una cuenta?{' '}
          <Link to="/registrar" className="register-link-text">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
