import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../server/credenciales';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/DetalleCoche.css';
import ImageToyota from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/toyota.jpg'

const DetalleCoche = () => {
  const { id } = useParams();
  const [coche, setCoche] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("Usuario autenticado en DetalleCoche:", user.uid);
      } else {
        console.log("No hay usuario autenticado en DetalleCoche");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCocheDetails = async () => {
      try {
        const docRef = doc(db, 'CochesInicio', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cocheData = { id: docSnap.id, ...docSnap.data() };
          console.log("Datos del coche:", cocheData);
          setCoche(cocheData);
          const currentUserUid = auth.currentUser ? auth.currentUser.uid : null;
          console.log("Usuario actual UID:", currentUserUid);
          console.log("Coche userId:", cocheData.userId);
          setIsOwner(currentUserUid === cocheData.userId);
          console.log("Es propietario:", currentUserUid === cocheData.userId);
        } else {
          console.log("No se encontró el documento");
          setCoche({
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
          });
        }
      } catch (error) {
        console.error("Error al obtener detalles del coche:", error);
      }
    };

    fetchCocheDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
      try {
        await deleteDoc(doc(db, 'CochesInicio', id));
        alert('Venta eliminada con éxito');
        navigate('/inicio');
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
        alert('Error al eliminar la venta');
      }
    }
  };

  if (!coche) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalle-coche-container">
      <h1>{coche.marca} {coche.modelo}</h1>
      <img src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} className="detalle-coche-imagen" />
      <p>{coche.descripcion}</p>
      <h3>Especificaciones:</h3>
      <ul>
        <li>Motor: {coche.especificaciones?.motor}</li>
        <li>Potencia: {coche.especificaciones?.potencia}</li>
        <li>Año: {coche.especificaciones?.año}</li>
        <li>Kilometraje: {coche.especificaciones?.kilometraje}</li>
        <li>Vendedor: {coche.especificaciones?.vendedor}</li>
      </ul>
      <p><strong>Precio: {coche.precio}</strong></p>
      
      {isOwner && (
        <button onClick={handleDelete} className="btn-eliminar">
          Eliminar Venta
        </button>
      )}
    </div>
  );
};

export default DetalleCoche;

