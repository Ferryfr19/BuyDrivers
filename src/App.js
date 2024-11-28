import React from 'react';
import Header from './componentes/Header'; // Importa el Header
import Sidebar from './componentes/Sidebar'; // Importa el Sidebar

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar /> {/* Agrega el Sidebar aquí */}
      {/* Resto de tu contenido */}
    </div>
  );
}

export default App;