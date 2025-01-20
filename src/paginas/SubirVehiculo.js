import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../server/credenciales';
import { doc, getDoc } from 'firebase/firestore';

const SubirVehiculo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cocheData, setCocheData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Obtener ID del coche pasado desde GestionVentas
        const cocheId = location.state?.cocheId;

        if (cocheId) {
          try {
            // Obtener datos del coche desde Firestore
            const docRef = doc(db, 'Coches', cocheId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setCocheData(docSnap.data());
              console.log(docSnap.data()); // Para verificar los datos obtenidos
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

   if (!cocheData) {
     return (<div>Cargando...</div>);
   }

   return (
     // Renderizar detalles del coche
     (<div>  
       {/* Título */}
       <h1>Subir Vehículo</h1>  
       {/* Detalles del coche */}
       (<div>  
         {/* Título de detalles */}
         (<h2>Detalles del Coche</h2>)  
         {/* Mostrar cada campo */}
         (<p>Marca: {cocheData.Marca}</p>)  
         (<p>Modelo: {cocheData.Modelo}</p>)  
         (<p>Color: {cocheData.Color}</p>)  
         (<p>Estado: {cocheData.Estado}</p>)  
         (<p>Año de Matriculación: {cocheData.año_matriculacion}</p>)  
         (<p>Kilómetros: {cocheData.km}</p>)  
         (<p>Precio: {cocheData.Precio}€</p>)  
         (<p>Combustible: {cocheData.Combustible}</p>)  
         (<p>Caja de Cambios: {cocheData.Caja_de_cambios}</p>)  
       </div>)
     </div>)
   );
};

export default SubirVehiculo;


