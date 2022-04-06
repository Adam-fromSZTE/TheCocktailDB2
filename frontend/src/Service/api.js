import axios from 'axios';
import SERVER_URL from '../Service/serverUrl'

class ApiService {
   randomDrink() {
     const endpoint = 'random-drink';
     return axios.get(SERVER_URL + endpoint);
   }
 }
 export default new ApiService();