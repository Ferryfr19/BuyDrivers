import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../server/credenciales';
import Sidebar from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/Sidebar.js';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Inicio.css';

const Inicio = () => {
  const [coches, setCoches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCoches = async () => {
      try {
        console.log('Cargando todos los coches...');
        setLoading(true);
        const cochesCollection = collection(db, 'CochesInicio');
        const cochesSnapshot = await getDocs(cochesCollection);
        const cochesList = cochesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCoches(cochesList);
      } catch (error) {
        console.error('Error al obtener coches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCoches();
  }, []);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    console.log('Parámetros de búsqueda:', searchParams);

    try {
      let cochesQuery = query(collection(db, 'CochesInicio'));

      Object.entries(searchParams).forEach(([key, value]) => {
        if (!value) return;

        // Mapeo de campos y conversiones
        const fieldMappings = {
          año: 'especificaciones.año',
          etiquetaAmbiental: 'especificaciones.etiquetaAmbiental',
          carroceria: 'especificaciones.carroceria',
          combustible: 'especificaciones.combustible',
          cajaCambios: 'especificaciones.cajaDeCambios',
        };

        // Manejo especial para precio (rango)
        if (key === 'precio') {
          const [min, max] = value.split('-').map(Number);
          cochesQuery = query(cochesQuery, where('precio', '>=', min));
          cochesQuery = query(cochesQuery, where('precio', '<=', max));
        } 
        // Campos normales
        else {
          const fieldPath = fieldMappings[key] || key;
          let queryValue = value;
          
          // Conversión numérica para año
          if (key === 'año') queryValue = Number(value);
          
          cochesQuery = query(cochesQuery, where(fieldPath, '==', queryValue));
        }
      });

      const cochesSnapshot = await getDocs(cochesQuery);
      const cochesList = cochesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      setCoches(cochesList);
    } catch (error) {
      console.error('Error al filtrar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando coches...</div>;
  }

  return (
    <div className="inicio-container">
      <Sidebar onSearch={handleSearch} />
      {coches.length === 0 ? (
        <p>No hay coches disponibles que coincidan con tu búsqueda.</p>
      ) : (
        coches.map((coche) => (
          <div key={coche.id} className="anuncio-container">
            <Link to={`/detalle-coche/${coche.id}`} className="anuncio">
              <img
                src={coche.imagen || '/placeholder.jpg'}
                alt={`${coche.marca} ${coche.modelo}`}
                className="anuncio-imagen"
              />
              <div className="anuncio-detalles">
                <h2>{coche.marca} {coche.modelo}</h2>
                <p>Precio: {coche.precio?.toLocaleString?.('es-ES') || 'N/A'}€</p>
                <div className="detalles-pequeños">
                  <p>Año: {coche.especificaciones?.año || 'N/A'}</p>
                  <p>Etiqueta: {coche.especificaciones?.etiquetaAmbiental || 'N/A'}</p>
                  <p>Carrocería: {coche.especificaciones?.carroceria || 'N/A'}</p>
                  <p>Combustible: {coche.especificaciones?.combustible || 'N/A'}</p>
                  <p>Caja: {coche.especificaciones?.cajaDeCambios || 'N/A'}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Inicio;