import React, { useState, useEffect } from 'react';
import { auth, db } from '../server/credenciales';
import { signOut } from 'firebase/auth';  // Añadir importación de signOut
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/PerfilUsuario.css'

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [historialVentas, setHistorialVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Obtener datos del usuario
          const userDocRef = doc(db, 'usuarios', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          // Obtener historial de ventas
          const ventasQuery = query(
            collection(db, 'ventas'), 
            where('vendedorId', '==', user.uid)
          );
          const ventasSnapshot = await getDocs(ventasQuery);
          const ventas = ventasSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setUserData(userDocSnap.data());
          setHistorialVentas(ventas);
          setLoading(false);
        } else {
          // Si no hay usuario autenticado, redirigir al login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Función para cerrar sesión
  const handleCerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="perfil-usuario">
      <h1>Mi Perfil</h1>
      
      {/* Información Personal */}
      <section className="informacion-personal">
        <h2>Datos Personales</h2>
        {userData && (
          <div>
            <p>Nombre: {userData.nombre} {userData.apellidos}</p>
            <p>Email: {userData.email}</p>
            <p>Teléfono: {userData.telefono}</p>
            <p>DNI: {userData.dni}</p>
            <p>Fecha Nacimiento: {userData.fechaNacimiento}</p>
          </div>
        )}
      </section>

      {/* Historial de Ventas */}
      <section className="historial-ventas">
        <h2>Historial de Ventas</h2>
        {historialVentas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Precio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {historialVentas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.fecha}</td>
                  <td>{venta.vehiculo}</td>
                  <td>{venta.precio}€</td>
                  <td>{venta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay ventas registradas</p>
        )}
      </section>

      {/* Estadísticas Básicas */}
      <section className="estadisticas">
        <h2>Mis Estadísticas</h2>
        <div>
          <p>Total Ventas: {historialVentas.length}</p>
          <p>Valor Total: {historialVentas.reduce((total, venta) => total + venta.precio, 0)}€</p>
        </div>
      </section>

      {/* Botón para cerrar sesión */}
      <button 
        onClick={handleCerrarSesion}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilUsuario;
