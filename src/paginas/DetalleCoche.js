import React from 'react';
import { useParams } from 'react-router-dom';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/DetalleCoche.css';
import ImageToyota from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/toyota.jpg'

const DetalleCoche = () => {
  const { id } = useParams(); // Obtener el ID del coche desde la URL

  // Simular datos del coche (en un proyecto real, harías una llamada a la API para obtener esta información)
  const coche = {
    id: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    precio: '20,000€',
    imagen: ImageToyota,
    descripcion: 'Un coche confiable, ideal para la ciudad y viajes largos.',
    especificaciones: {
      motor: '1.8L Híbrido',
      potencia: '122 CV',
      año: 2023,
      kilometraje: '0 km',
      vendedor: 'Alfonso Guerra'
    },
  };

  return (
    <div className="detalle-coche-container">
      <h1>{coche.marca} {coche.modelo}</h1>
      <img src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} className="detalle-coche-imagen" />
      <p>{coche.descripcion}</p>
      <h3>Especificaciones:</h3>
      <ul>
        <li>Motor: {coche.especificaciones.motor}</li>
        <li>Potencia: {coche.especificaciones.potencia}</li>
        <li>Año: {coche.especificaciones.año}</li>
        <li>Kilometraje: {coche.especificaciones.kilometraje}</li>
        <li>Vendedor: {coche.especificaciones.vendedor}</li>
      </ul>
      <p><strong>Precio: {coche.precio}</strong></p>
    </div>
  );
};

export default DetalleCoche;
