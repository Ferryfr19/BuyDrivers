const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // Usuario por defecto
  password: '',  // Contraseña de tu base de datos
  database: 'buydrivers_sql',  // Nombre de tu base de datos
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para poder parsear JSON en el cuerpo de las peticiones

// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { email, contraseña, nombre, apellidos } = req.body;

  if (!email || !contraseña || !nombre || !apellidos) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya está registrado
    pool.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Insertar nuevo usuario
      const fechaRegistro = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
      pool.query(
        'INSERT INTO Usuarios (email, contraseña, nombre, apellidos, fecha_registro) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, nombre, apellidos, fechaRegistro],
        (err, result) => {
          if (err) throw err;

          res.status(201).json({ message: 'Usuario registrado exitosamente' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para el login de usuarios
app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar al usuario en la base de datos
    pool.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const usuario = results[0];

      // Comparar la contraseña
      const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Generar un token JWT
      const token = jwt.sign(
        { id: usuario.PK_Id_Usuario, email: usuario.email },
        'clave_secreta', // Cambia esto por una clave secreta más segura
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

