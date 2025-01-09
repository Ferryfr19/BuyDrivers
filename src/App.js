import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar'; // Importa tu sidebar
import Footer from './componentes/Footer';   // Importa tu footer
import Inicio from './paginas/Inicio';
import Login from './paginas/login';
import GestionVentas from './paginas/GestionVentas';
import VendedoresDestacados from './paginas/VendedoresDestacados';

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
          <Route path="/login" element={<Login />} />
          <Route path="/gestion-ventas" element={<GestionVentas />} />
          <Route path="/vendedores-destacados" element={<VendedoresDestacados />} />
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
