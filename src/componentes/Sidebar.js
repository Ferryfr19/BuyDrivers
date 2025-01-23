import React, { useState } from 'react';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Sidebar.css'; 

const Sidebar = ({ onSearch }) => {
  const [modelos, setModelos] = useState([]);
  const [searchParams, setSearchParams] = useState({
    marca: '',
    modelo: '',
    año: '',
    etiquetaAmbiental: '',
    carroceria: '',
    combustible: '',
    cajaCambios: '',
    precio: ''
  });

  // Mapeo de los modelos por marca
  const modelosPorMarca = {
    Renault: ["Clio", "Megane", "Captur"],
    Nissan: ["Micra", "Qashqai", "X-Trail"],
    Mitsubishi: ["Outlander", "ASX", "L200"],
    Dacia: ["Sandero", "Duster", "Logan"],
    BMW: ["Serie 1", "Serie 3", "X5"],
    Ford: ["Fiesta", "Focus", "Mustang"],
    Hyundai: ["i10", "i30", "Tucson"],
    Volkswagen: ["Golf", "Polo", "Tiguan"],
    Audi: ["A3", "A4", "Q5"],
    SEAT: ["Ibiza", "Leon", "Ateca"],
    Toyota: ["Yaris", "Corolla", "RAV4"],
    Mercedes: ["Clase A", "Clase C", "GLE"],
    Honda: ["Civic", "CR-V", "HR-V"],
    Citroen: ["C3", "C4", "C5 Aircross"],
    Peugeot: ["208", "308", "3008"],
    Kia: ["Rio", "Ceed", "Sportage"]
  };
  
  // Función para manejar cambios en el selector de marca
  const handleMarcaChange = (event) => {
    const marca = event.target.value;
    setModelos(marca ? modelosPorMarca[marca] : []);
    setSearchParams({ ...searchParams, marca: marca, modelo: '' });
  };

  // Función para manejar cambios en los campos de búsqueda
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  // Función de búsqueda cuando se envía el formulario
  const handleSearch = (event) => {
    event.preventDefault();
  
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== '')
    );
  
    console.log("Parámetros enviados desde Sidebar:", filteredParams);
  
    if (typeof onSearch === 'function') {
      onSearch(filteredParams); // Llama a la función pasada desde `Inicio.js`
    } else {
      console.error('onSearch no es una función');
    }
  };
  
  
  return (
    <div className="sidebar">
      <div className="search-container">
        <input type="text" placeholder="Buscar..." className="search-input" />  
      </div>

      <div className="dropdown">
        <form onSubmit={handleSearch}>
          {/* Selector de Marca */}
          <select name="marca" id="marca" value={searchParams.marca} onChange={handleMarcaChange}>
            <option value="">Marca</option> 
            {Object.keys(modelosPorMarca).map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>

          {/* Selector de Modelo */}
          <select name="modelo" id="modelo" value={searchParams.modelo} onChange={handleInputChange}>
            <option value="">Modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>

          {/* Selector de Año */}
          <select name="año" id="año" value={searchParams.año} onChange={handleInputChange}>
            <option value="">Año</option>
            {Array.from({length: 45}, (_, i) => 1980 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {/* Selector de Etiqueta Ambiental */}
          <select name="etiquetaAmbiental" id="etiquetaAmbiental" value={searchParams.etiquetaAmbiental} onChange={handleInputChange}>
            <option value="">Etiqueta ambiental</option>
            <option value="0">0 emisiones</option>
            <option value="ECO">ECO</option>
            <option value="C">Etiqueta C</option>
            <option value="B">Etiqueta B</option>
          </select>

          {/* Selector de Carrocería */}
          <select name="carroceria" id="carroceria" value={searchParams.carroceria} onChange={handleInputChange}>
            <option value="">Carrocería</option>
            <option value="Limusina">Limusina</option>
            <option value="Pick-up">Pick-up</option>
            <option value="Sedán">Sedán</option>
            <option value="Compacto">Compacto</option>
            <option value="Coupé">Coupé</option>
            <option value="Todoterreno">Todoterreno</option>
            <option value="Descapotable">Descapotable</option>
          </select>

          {/* Selector de Combustible */}
          <select name="combustible" id="combustible" value={searchParams.combustible} onChange={handleInputChange}>
            <option value="">Combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrico">Eléctrico</option>
            <option value="Hibrido">Híbrido</option>
          </select>

          {/* Selector de Caja de Cambios */}
          <select name="cajaCambios" id="cajaCambios" value={searchParams.cajaCambios} onChange={handleInputChange}>
            <option value="">Caja de cambios</option>
            <option value="Manual">Manual</option>
            <option value="Automatico">Automático</option>
            <option value="Semiautomatico">Semiautomático</option>
            <option value="CVT">CVT</option>
          </select>

          {/* Selector de Rango de Precio */}
          <select name="precio" id="precio" value={searchParams.precio} onChange={handleInputChange}>
            <option value="">Precio</option>
            <option value="100-999">100€-999€</option>
            <option value="1000-9999">1000€-9.999€</option>
            <option value="10000-99999">10.000€-99.999€</option>
            <option value="100000-1000000">100.000€-1.000.000€</option>
          </select>

          {/* Botón de búsqueda */}
          <input type="submit" value="Buscar" />
          
        </form>
      </div>
    </div>
  );
};

export default Sidebar;


