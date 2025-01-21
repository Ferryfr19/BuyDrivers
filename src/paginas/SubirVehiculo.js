import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../server/credenciales';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/SubirVehiculo.css';

const SubirVehiculo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cocheData, setCocheData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const cocheId = location.state?.cocheId;

        if (cocheId) {
          try {
            const docRef = doc(db, 'Coches', cocheId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setCocheData(docSnap.data());
            }
          } catch (error) {
            console.error("Error al obtener datos del coche:", error);
          }
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const subirAInicio = async () => {
    if (!cocheData) {
      alert('No hay datos del coche para subir');
      return;
    }

    try {
      const cocheParaInicio = {
        marca: cocheData.Marca,
        modelo: cocheData.Modelo,
        precio: `${cocheData.Precio}€`,
        imagen: cocheData.imagenes && cocheData.imagenes.length > 0 
          ? cocheData.imagenes[0] 
          : 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/Toyota.jpg',
        userId: auth.currentUser.uid // Añadimos el userId del usuario actual
      };

      await addDoc(collection(db, 'CochesInicio'), cocheParaInicio);
      console.log('Vehículo subido exitosamente:', cocheParaInicio);
      alert('Vehículo subido a Inicio exitosamente');
      navigate('/inicio');
    } catch (error) {
      console.error("Error al subir el vehículo a Inicio:", error);
      alert('Error al subir el vehículo a Inicio: ' + error.message);
    }
  };

  if (!cocheData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="subir-vehiculo-container">
      <h1>Subir Vehículo</h1>
      <div className="detalles-coche">
        <h2>Detalles del Coche</h2>
        <p><span>Marca:</span> <span>{cocheData.Marca}</span></p>
        <p><span>Modelo:</span> <span>{cocheData.Modelo}</span></p>
        <p><span>Color:</span> <span>{cocheData.Color}</span></p>
        <p><span>Estado:</span> <span>{cocheData.Estado}</span></p>
        <p><span>Año de Matriculación:</span> <span>{cocheData.año_matriculacion}</span></p>
        <p><span>Kilómetros:</span> <span>{cocheData.km}</span></p>
        <p><span>Precio:</span> <span>{cocheData.Precio}€</span></p>
        <p><span>Combustible:</span> <span>{cocheData.Combustible}</span></p>
        <p><span>Caja de Cambios:</span> <span>{cocheData.Caja_de_cambios}</span></p>
      </div>
      <button onClick={subirAInicio} className="btn-subir-inicio">
        Subir a Inicio
      </button>
      <button className="btn-accion" onClick={() => navigate('/gestion-ventas')}>
        Volver a Gestión de Ventas
      </button>
    </div>
  );
};

export default SubirVehiculo;


