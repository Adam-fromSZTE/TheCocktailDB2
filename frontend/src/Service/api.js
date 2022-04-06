import axios from 'axios';
import SERVER_URL from '../Service/serverUrl'

class ApiService {
   randomDrink() {
     const endpoint = 'cocktail';
     return axios.get(SERVER_URL + endpoint);
   }

   searchDrink(name) {
      const endpoint = 'cocktails/';
      return axios.post(SERVER_URL + endpoint + name);
    }
 }
 export default new ApiService();