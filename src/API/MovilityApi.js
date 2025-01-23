class MovilityApi {
  constructor() {
    this.baseUrl = 'https://sandbox.api.high-mobility.com/v1/access_tokens';
    this.publicKey = 'b9f74e1c-cb4d-4c21-93e5-99530623106f';
  }

  async makeRequest(endpoint, method = 'GET', body = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.publicKey}`
    };

    const options = {
      method,
      headers
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  }

  async getFleetData(searchParams) {
    console.log("Parámetros de búsqueda recibidos en API:", searchParams);
    const queryString = new URLSearchParams(searchParams).toString();
    console.log("URL de búsqueda:", `${this.baseUrl}/fleet?${queryString}`);
    try {
      const response = await this.makeRequest(`/fleet?${queryString}`);
      console.log("Respuesta de la API:", response);
      // Asegúrate de que la respuesta tenga el formato correcto
      return response.map(coche => ({
        id: coche.id,
        marca: coche.brand,
        modelo: coche.model,
        año: coche.year,
        precio: coche.price,
        especificaciones: {
          etiquetaAmbiental: coche.environmentalLabel,
          carroceria: coche.bodyType,
          combustible: coche.fuelType,
          cajaDeCambios: coche.transmission
        }
      }));
    } catch (error) {
      console.error("Error en getFleetData:", error);
      throw error;
    }
  }

  async getAccessToken(data) {
    return this.makeRequest('/access_tokens', 'POST', data);
  }

  async getVehicleData(vehicleId) {
    return this.makeRequest(`/vehicles/${vehicleId}`);
  }
}

export default MovilityApi;

