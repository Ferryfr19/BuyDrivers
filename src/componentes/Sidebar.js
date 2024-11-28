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
        <option value="" disabled selected>Año</option>
        <option value="1980">1980</option>
        <option value="1981">1981</option>
        <option value="1982">1982</option>
        <option value="1983">1983</option>
        <option value="1984">1984</option>
        <option value="1985">1985</option>
        <option value="1986">1986</option>
        <option value="1987">1987</option>
        <option value="1988">1988</option>
        <option value="1989">1989</option>
        <option value="1990">1990</option>
        <option value="1991">1991</option>
        <option value="1992">1992</option>
        <option value="1993">1993</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
        <option value="1999">1999</option>
        <option value="2000">2000</option>
        <option value="2001">2001</option>
        <option value="2002">2002</option>
        <option value="2003">2003</option>
        <option value="2004">2004</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        </select>
        <input type="submit" value="Buscar" />
      </form>
      <form action="#">
        <select name="lenguages" id="lang">
          <option value="" disabeled selected>Etiqueta ambiental</option>
          <option value="0">0 emisiones</option>
          <option value="ECO">ECO</option>
          <option value="C">Etiqueta C</option>
          <option value="B">Etiqueta B</option>
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