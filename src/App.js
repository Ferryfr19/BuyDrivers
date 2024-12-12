import React from 'react';
import Header from './componentes/Header'; // Importa el Header
import Sidebar from './componentes/Sidebar'; // Importa el Sidebar
import Footer from './componentes/Footer'; // Importa el Footer

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar /> {/* Sidebar al lado del contenido */}
        {/* Aquí puedes añadir el contenido principal */}
        <div className="content"> {/* Placeholder para contenido principal */}
        </div>
      </div>
      <Footer /> {/* Agrega el Footer aquí */}
    </div>
  );
}

export default App;