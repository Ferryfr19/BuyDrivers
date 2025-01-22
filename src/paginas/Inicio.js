import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../server/credenciales';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Inicio.css';

const Inicio = () => {
  const [coches, setCoches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoches = async () => {
      setLoading(true);
      try {
        console.log("Iniciando carga de coches...");
        const cochesCollection = collection(db, 'CochesInicio');
        const cochesSnapshot = await getDocs(cochesCollection);
        const cochesList = cochesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Coches cargados:", cochesList.length);
        setCoches(cochesList);
      } catch (error) {
        console.error("Error al cargar coches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoches();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("Estado de autenticación cambiado:", user ? "Usuario autenticado" : "Usuario no autenticado");
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando coches...</div>;
  }

  return (
    <div className="inicio-container">
      {coches.length === 0 ? (
        <p>No hay coches disponibles en este momento.</p>
      ) : (
        coches.map((coche) => (
          <div key={coche.id} className="anuncio-container">
            <Link to={`/detalle-coche/${coche.id}`} className="anuncio">
              <img src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} className="anuncio-imagen" />
              <div className="anuncio-detalles">
                <h2>{coche.marca} {coche.modelo}</h2>
                <p>Precio: {coche.precio}</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Inicio;
