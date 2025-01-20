import React, { useState } from 'react';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Registrar.css'; // Asegúrate de importar el archivo CSS

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
      // Lógica para manejar el registro...
      console.log('Formulario enviado');
      // Aquí puedes agregar la lógica para enviar los datos al servidor
   };

   return (
     <div className="registrar-container">
       <div className="registrar-form">
         <h1 className="registrar-title">Registrarse</h1>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="nombre" className="label">Nombre:</label>
             <input
               type="text"
               id="nombre"
               value={nombre}
               onChange={(e) => setNombre(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label htmlFor="apellidos" className="label">Apellidos:</label>
             <input
               type="text"
               id="apellidos"
               value={apellidos}
               onChange={(e) => setApellidos(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label htmlFor="email" className="label">Correo Electrónico:</label>
             <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label htmlFor="password" className="label">Contraseña:</label>
             <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label htmlFor="telefono" className="label">Teléfono:</label>
             <input
               type="text"
               id="telefono"
               value={telefono}
               onChange={(e) => setTelefono(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label htmlFor="dni" className="label">DNI/NIF:</label>
             <input
               type="text"
               id="dni"
               value={dni}
               onChange={(e) => setDni(e.target.value)}
               required
               className="input"
             />
           </div>
           <div className="form-group">
             <label className="label">Fecha de Nacimiento:</label>
             <div className="date-inputs">
              <input
                type="number"
                placeholder="Año"
                value={anioNacimiento}
                onChange={(e) => setAnioNacimiento(e.target.value)}
                required
                className="date-input"
              />
              <input
                type="text"
                placeholder="Mes"
                value={mesNacimiento}
                onChange={(e) => setMesNacimiento(e.target.value)}
                required
                className="date-input"
              />
              <input
                type="number"
                placeholder="Día"
                value={diaNacimiento}
                onChange={(e) => setDiaNacimiento(e.target.value)}
                required
                className="date-input"
              />
            </div>
           </div>
           <button type="submit" className="submit-button">Registrarse</button>
         </form>
       </div>
     </div>
   );
};

export default Registro;





