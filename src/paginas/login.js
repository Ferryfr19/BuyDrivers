import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../server/credenciales';
import './Login.css'; // Asegúrate de que este archivo CSS exista

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Para redirigir después del inicio de sesión

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Intentar iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('¡Has iniciado sesión!');
      navigate('/dashboard'); // Redirigir al dashboard después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error en el inicio de sesión'); // Mensaje genérico en caso de error
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      {message && <h2 className="error-message">{message}</h2>} {/* Muestra el mensaje si existe */}
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
