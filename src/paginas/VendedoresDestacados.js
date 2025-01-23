import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../server/credenciales';
import ReactStars from 'react-stars';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/VendedoresDestacados.css';

const VendedoresDestacados = () => {
  const [vendedoresDestacados, setVendedoresDestacados] = useState([]);

  useEffect(() => {
    const fetchVendedoresDestacados = async () => {
      try {
        const cochesQuery = query(collection(db, 'CochesInicio'));
        const cochesSnapshot = await getDocs(cochesQuery);
        
        const vendedoresMap = new Map();

        cochesSnapshot.forEach((doc) => {
          const coche = doc.data();
          if (coche.userId && coche.valoracionComprador) {
            if (!vendedoresMap.has(coche.userId)) {
              vendedoresMap.set(coche.userId, {
                id: coche.userId,
                totalValoraciones: 0,
                sumaValoraciones: 0,
                coches: 0
              });
            }
            const vendedor = vendedoresMap.get(coche.userId);
            vendedor.totalValoraciones++;
            vendedor.sumaValoraciones += coche.valoracionComprador;
            vendedor.coches++;
          }
        });

        const vendedoresArray = Array.from(vendedoresMap.values())
          .map(vendedor => ({
            ...vendedor,
            valoracionPromedio: vendedor.sumaValoraciones / vendedor.totalValoraciones
          }))
          .sort((a, b) => b.valoracionPromedio - a.valoracionPromedio)
          .slice(0, 5);

        // Obtener información adicional del usuario
        const vendedoresConInfo = await Promise.all(vendedoresArray.map(async (vendedor) => {
          const userDoc = await getDoc(doc(db, 'usuarios', vendedor.id));
          const userData = userDoc.data();

          console.log('User Data:', userData); // Verificar qué datos devuelve Firebase

          // Verificación para asegurar que el apellido y nombre estén disponibles
          const nombre = userData?.nombre || 'Nombre no disponible';
          const apellido = userData?.apellido 
          
          return {
            ...vendedor,
            nombre,
            apellido
          };
        }));

        setVendedoresDestacados(vendedoresConInfo);
      } catch (error) {
        console.error("Error al obtener vendedores destacados:", error);
      }
    };

    fetchVendedoresDestacados();
  }, []);

  return (
    <div className="vendedores-destacados">
      <h2>Vendedores Destacados</h2>
      <div className="vendedores-lista">
        {vendedoresDestacados.map((vendedor) => (
          <div key={vendedor.id} className="vendedor-card">
            <h3>{vendedor.nombre} {vendedor.apellido}</h3>
            <ReactStars
              count={5}
              value={vendedor.valoracionPromedio}
              size={24}
              color2={'#ffd700'}
              edit={false}
            />
            <p>Valoración promedio: {vendedor.valoracionPromedio.toFixed(2)}</p>
            <p>Total valoraciones: {vendedor.totalValoraciones}</p>
            <p>Coches vendidos: {vendedor.coches}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendedoresDestacados;
