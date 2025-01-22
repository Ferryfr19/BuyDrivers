import axios from 'axios';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

// Cargar la clave privada desde KEY_PRIVATE.env
dotenv.config({ path: path.resolve(__dirname, 'KEY_PRIVATE.env') });
const privateKey = process.env.HIGH_MOBILITY_PRIVATE_KEY;

const BASE_URL = 'https://sandbox.api.high-mobility.com/v1';
const TOKEN_URL = `${BASE_URL}/access_tokens`;
const PUBLIC_KEY = 'b9f74e1c-cb4d-4c21-93e5-99530623106f';

class MovilityApi {
  constructor() {
    this.accessToken = null;
  }

  async getAccessToken() {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await axios.post(TOKEN_URL, {
        client_id: PUBLIC_KEY,
        client_secret: privateKey,
        grant_type: 'client_credentials',
        scope: 'vehicle.data'
      });

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }

  async getVehicleData(vehicleId) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(`${BASE_URL}/vehicles/${vehicleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      throw error;
    }
  }

  // Puedes añadir más métodos aquí para interactuar con diferentes endpoints de la API
}

export default new MovilityApi();
