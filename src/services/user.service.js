/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://careerwheel-api-dkutd.ondigitalocean.app/api/users';

class UserService {
  getUserMe() {
    return axios.get(`${API_URL}/me`, { headers: authHeader() });
  }
}

export default new UserService();
