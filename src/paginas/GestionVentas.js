import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../server/credenciales';
import { collection, addDoc } from 'firebase/firestore';
import './GestionVentas.css';
import carImage from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/coche.jpg';

const GestionVentas = () => {
  const [modelos, setModelos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Estados para cada select
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [etiquetaAmbiental, setEtiquetaAmbiental] = useState('');
  const [carroceria, setCarroceria] = useState('');
  const [combustible, setCombustible] = useState('');
  const [cajaCambios, setCajaCambios] = useState('');
  const [precio, setPrecio] = useState('');
  const [color, setColor] = useState('');
  const [estado, setEstado] = useState('');
  const [kmRecorridos, setKmRecorridos] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const modelosPorMarca = {
    Renault: ["Clio", "Megane", "Captur"],
    Nissan: ["Micra", "Qashqai", "X-Trail"],
    Mitsubishi: ["Outlander", "ASX", "L200"],
    Dacia: ["Sandero", "Duster", "Logan"],
    BMW: ["Serie 1", "Serie 3", "X5"],
    Ford: ["Fiesta", "Focus", "Mustang"],
    Hyundai: ["i10", "i30", "Tucson"],
    Volkswagen: ["Golf", "Polo", "Tiguan"],
    Audi: ["A3", "A4", "Q5"],
    SEAT: ["Ibiza", "Leon", "Ateca"],
    Toyota: ["Yaris", "Corolla", "RAV4"],
    Mercedes: ["Clase A", "Clase C", "GLE"],
    Honda: ["Civic", "CR-V", "HR-V"],
    Citroen: ["C3", "C4", "C5 Aircross"],
    Peugeot: ["208", "308", "3008"],
    Kia: ["Rio", "Ceed", "Sportage"]
  };

  const handleMarcaChange = (event) => {
    const marca = event.target.value;
    setMarcaSeleccionada(marca);

    if (marca) {
      setModelos(modelosPorMarca[marca]);
    } else {
      setModelos([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        const cocheData = {
          Marca: marca,
          Modelo: modelo,
          Color: color,
          Estado: estado,
          Fecha_publicacion: new Date().getFullYear(),
          PK_id_coche: 0,
          Precio: parseInt(precio),
          año_matriculacion: parseInt(año),
          km: parseInt(kmRecorridos),
          Combustible: combustible,
          Caja_de_cambios: cajaCambios,
          etiquetaAmbiental: etiquetaAmbiental,  // Añadido
          carroceria: carroceria               // Añadido
        };

        const docRef = await addDoc(collection(db, 'Coches'), cocheData);

        navigate('/subir-vehiculo', { 
          state: { 
            cocheId: docRef.id 
          } 
        });

      } catch (error) {
        console.error("Error al guardar el coche:", error);
        alert(`Hubo un problema: ${error.message}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <div className="sidebar-horizontal">
        <form>
          <select 
            name="marca" 
            value={marca}
            onChange={(e) => {
              setMarca(e.target.value);
              handleMarcaChange(e);
            }}
          >
            <option value="" disabled>Marca</option>
            {Object.keys(modelosPorMarca).map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>

          <select 
            name="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          >
            <option value="" disabled>Modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
        </form>

        <form>
          <select 
            value={año} 
            onChange={(e) => setAño(e.target.value)}
          >
            <option value="" disabled>Año</option>
            {Array.from({length: 2025 - 1980 + 1}, (_, index) => 1980 + index).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </form>

        <form>
          <select 
            value={etiquetaAmbiental}
            onChange={(e) => setEtiquetaAmbiental(e.target.value)}
          >
            <option value="" disabled>Etiqueta ambiental</option>
            <option value="0">0 emisiones</option>
            <option value="ECO">ECO</option>
            <option value="C">Etiqueta C</option>
            <option value="B">Etiqueta B</option>
          </select>
        </form>

        <form>
          <select 
            value={carroceria}
            onChange={(e) => setCarroceria(e.target.value)}
          >
            <option value="" disabled>Carrocería</option>
            <option value="Limusina">Limusina</option>
            <option value="Pick-up">Pick-up</option>
            <option value="Sedán">Sedán</option>
            <option value="Compacto">Compacto</option>
            <option value="Coupé">Coupé</option>
            <option value="Todoterreno">Todoterreno</option>
            <option value="Descapotable">Descapotable</option>
          </select>
        </form>

        <form>
          <select 
            value={combustible}
            onChange={(e) => setCombustible(e.target.value)}
          >
            <option value="" disabled>Combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrico">Eléctrico</option>
            <option value="Hibrido">Híbrido</option>
          </select>
        </form>

        <form>
          <select 
            value={cajaCambios}
            onChange={(e) => setCajaCambios(e.target.value)}
          >
            <option value="" disabled>Caja de cambios</option>
            <option value="Manual">Manual</option>
            <option value="Automatico">Automático</option>
            <option value="Semiautomatico">Semiautomático</option>
            <option value="CVT">CVT</option>
          </select>
        </form>

        {/* Contenedor para Kilómetros y Precio */}
        <form onSubmit={handleSubmit}>
          <div className="km-precio-container">
              {/* Campo de Kilómetros */}
              <input 
                type="number" 
                min="0"
                placeholder="Kilómetros recorridos"
                onChange={(e) => setKmRecorridos(e.target.value)}
                required
              />
              {/* Campo de Precio */}
              <input 
                type="number" 
                min="0"
                placeholder="Ingrese el precio" 
                required
                onChange={(e) => setPrecio(e.target.value)} 
              />
              {/* Botón de Añadir */}
              <input type="submit" value="Añadir" />
           </div>  
         </form>
      </div>

      {/* Título */}
      <div className="eltitulo">
         <h1>RELLENA LOS CAMPOS</h1> 
      </div>

      {/* Imagen de fondo */}
      <div className="fondo">
         {/* Imagen del coche */}
         <img src={carImage} alt="fondo coche" className="coche-fondo" />
      </div>

   </div>  
 );
};

export default GestionVentas;
