import React, { useState } from 'react';
import './GestionVentas.css'; // Vincula el archivo CSS correspondiente
import carImage from 'C:/Users/Ferran/React/buydrivers-app/src/componentes/imagenes/coche.jpg';

const GestionVentas = () => {
  const [modelos, setModelos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');

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

    if (marca) {
      setModelos(modelosPorMarca[marca]);
    } else {
      setModelos([]);
    }
  };

  return (
    <div>
      <div className="sidebar-horizontal">
        <div className="search-container">
        </div>

        <form action="#">
          <select name="marca" id="marca" onChange={handleMarcaChange}>
            <option value="" disabled selected>Marca</option>
            {Object.keys(modelosPorMarca).map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>

          <select name="modelo" id="modelo">
            <option value="" disabled selected>Modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>

          <select name="anio" id="anio">
            <option value="" disabled selected>Año</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            {/* Agregar más años según sea necesario */}
          </select>

          <input type="submit" value="Buscar" />
        </form>

        <form action="#">
          <select name="lenguajes" id="lang">
            <option value="" disabled selected>Año</option>
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
            {/* Continúa los años aquí */}
          </select>
          <input type="submit" value="Buscar" />
        </form>

        <form action="#">
          <select name="lenguajes" id="lang">
            <option value="" disabled selected>Etiqueta ambiental</option>
            <option value="0">0 emisiones</option>
            <option value="ECO">ECO</option>
            <option value="C">Etiqueta C</option>
            <option value="B">Etiqueta B</option>
          </select>
          <input type="submit" value="Buscar" />
        </form>

        <form action="#">
          <select name="lenguajes" id="lang">
            <option value="" disabled selected>Carrocería</option>
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
            <option value="Electrico">Eléctrico</option>
            <option value="Hibrido">Híbrido</option>
          </select>
          <input type="submit" value="Buscar" />
        </form>

        <form action="#">
          <select name="lenguajes" id="lang">
            <option value="" disabled selected>Caja de cambios</option>
            <option value="Manual">Manual</option>
            <option value="Automatico">Automático</option>
            <option value="Semiautomatico">Semiautomático</option>
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
            <option value="100.000€-1.000.000€">100.000€-1.000.000€</option>
          </select>
          <input type="submit" value="Buscar" />
        </form>
      </div>
      <div classname = "eltitulo">
          <h1>RELLENA LOS CAMPOS</h1>
      </div>
      <div classname= "fondo">
        <img src={carImage} alt="fondo coche" className="coche-fondo" />
      </div>
    </div>
  );
};

export default GestionVentas;

