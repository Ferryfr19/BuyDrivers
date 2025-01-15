import React from 'react';
import { Link } from 'react-router-dom';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Inicio.css';

const Inicio = () => {
  const coche = {
    id: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    precio: '20.000€',
    imagen: 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/Toyota.jpg' // URL temporal para la imagen
  };

  return (
    <div className="inicio-container">
      <div className="anuncio-container">
        <Link to={`/detalle-coche/${coche.id}`} className="anuncio">
          <img src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} className="anuncio-imagen" />
          <div className="anuncio-detalles">
            <h2>{coche.marca} {coche.modelo}</h2>
            <p>Precio: {coche.precio}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;

