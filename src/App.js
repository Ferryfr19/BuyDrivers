import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar'; // Importa tu sidebar
import Footer from './componentes/Footer';   // Importa tu footer
import Inicio from './paginas/Inicio';
import Login from './paginas/login';
import GestionVentas from './paginas/GestionVentas';
import VendedoresDestacados from './paginas/VendedoresDestacados';
import Registrar from './paginas/Registrar'; // Importa la nueva página de registro
import DetalleCoche from './paginas/DetalleCoche';
import appFirebase from './server/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PerfilUsuario from './paginas/PerfilUsuario'; 
import SubirVehiculo from './paginas/SubirVehiculo';


const auth = getAuth(appFirebase)

const App = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  return (
    <>
      <Header />
      {/* Muestra el Sidebar y Footer solo en la página de Inicio */}
      {location.pathname === '/inicio' && <Sidebar />}
      <main>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/detalle-coche/:id" element={<DetalleCoche />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gestion-ventas" element={<GestionVentas />} />
          <Route path="/vendedores-destacados" element={<VendedoresDestacados />} />
          <Route path="/registrar" element={<Registrar />} /> {/* Ruta para registrarse */}
          <Route path="/perfil-usuario" element={<PerfilUsuario />} />
          <Route path="/subir-vehiculo" element={<SubirVehiculo />} />
        </Routes>
      </main>
      {location.pathname === '/inicio' && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

