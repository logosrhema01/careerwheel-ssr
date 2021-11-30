/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_URL = 'https://careerwheel-api-dkutd.ondigitalocean.app/api/auth';

class AuthService {
  async login({ email, password }) {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register({ firstName, lastName, dob, occupation, location, gender, email, password }) {
    const response = axios.post(`${API_URL}/signup`, {
      firstName,
      lastName,
      dob,
      occupation,
      location,
      gender,
      email,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
