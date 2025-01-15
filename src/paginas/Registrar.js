import React, { useState } from 'react';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [anioNacimiento, setAnioNacimiento] = useState('');
  const [mesNacimiento, setMesNacimiento] = useState('');
  const [diaNacimiento, setDiaNacimiento] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email,
      contraseña: password,
      nombre,
      apellidos,
      telefono,
      dni,
      anioNacimiento,
      mesNacimiento,
      diaNacimiento
    };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.message === 'Usuario registrado exitosamente') {
        alert('Registro exitoso');
        // Redirigir al login si deseas
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)', maxWidth: '350px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px', color: '#333' }}>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="nombre" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="apellidos" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="telefono" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="dni" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>DNI/NIF:</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Fecha de Nacimiento:</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                type="number"
                placeholder="Año"
                value={anioNacimiento}
                onChange={(e) => setAnioNacimiento(e.target.value)}
                required
                style={{ flex: '0.3', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              />
              <input
                type="text"
                placeholder="Mes"
                value={mesNacimiento}
                onChange={(e) => setMesNacimiento(e.target.value)}
                required
                style={{ flex: '0.3', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              />
              <input
                type="number"
                placeholder="Día"
                value={diaNacimiento}
                onChange={(e) => setDiaNacimiento(e.target.value)}
                required
                style={{ flex: '0.3', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '14px', cursor: 'pointer' }}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;




