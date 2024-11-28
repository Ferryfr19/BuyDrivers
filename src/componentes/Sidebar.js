import React, { useState } from 'react';
import 'C:/Users/Ferran/React/buydrivers-app/src/componentes/css/Sidebar.css'; 

const Sidebar = () => {
  const[modelos, setModelos] = useState([]);
  const[marcaSeleccionada, setMarcaSeleccionada] = useState('');

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
  
  const handleMarcaChange = (event) => {
    const marca = event.target.value;
    setMarcaSeleccionada(marca);

    if(marca){
      setModelos(modelosPorMarca[marca]);
    } else{
      setModelos([]);
    }
  };
  return (
    <div className="sidebar">
      <div className="search-container">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>

      <div className="dropdown">
        <form action="#">
          <select name="marca" id="marca" onChange={handleMarcaChange}>
            <option value="" disabled selected>Marca</option> 
            {Object.keys(modelosPorMarca).map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>

          <label htmlFor="modelo"></label>
          <select name="modelo" id="modelo">
            <option value="" disabled selected>Modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
          <input type="submit" value="Buscar" />
        </form>
      <form action="#">
      <select name="lenguajes" id="lang">
          <option value="" disabled selected>Carroceria</option> 
          <option value="Limusina">Limusina</option>
          <option value="Pick-up">Pick-up</option>
          <option value="Sedán">Sedán</option>
          <option value="Compacto">Compacto</option>
          <option value="Coupé">Coupé</option>
          <option value="Todoterreno">Todoterreno</option>
          <option value="Descapotable">Descapotable</option>
         </select>
         <input type="submit" value="Buscar" />
      </form>
      <form action="#">
      <select name="lenguajes" id="lang">
          <option value="" disabled selected>Combustible</option> 
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Electrico">Electrico</option>
          <option value="Hibrido">Hibrido</option>
         </select>
         <input type="submit" value="Buscar" />
      </form>
      <form action="#">
      <select name="lenguajes" id="lang">
          <option value="" disabled selected>Caja de cambios</option> 
          <option value="Manual">Manual</option>
          <option value="Automatico">Automatico</option>
          <option value="Semiautomatico">Semiautomatico</option>
          <option value="CVT">CVT</option>
         </select>
         <input type="submit" value="Buscar" />
      </form>
      <form action="#">
      <select name="lenguajes" id="lang">
          <option value="" disabled selected>Precio</option> 
          <option value="100€-999€">100€-999€</option>
          <option value="1000€-9.999€">1000€-9.999€</option>
          <option value="10.000€-99.999€">10.000€-99.999€</option>
          <option value="10.000€-99.999€">10.000€-99.999€</option>
          <option value="100.000€-1.000.000€">100.000€-1.000.000€</option>
         </select>
         <input type="submit" value="Buscar" />
      </form>
      
    </div>

    </div>
  );
};

export default Sidebar;