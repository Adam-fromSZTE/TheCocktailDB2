import axios from 'axios';
import SERVER_URL from '../Service/serverUrl'

class ApiService {
  //Api which make a get to the server
   randomDrink() {
     const endpoint = 'cocktail/';
     return axios.get(SERVER_URL + endpoint);
   }

   //Api which make a get to the server, in the query i give the name variable
   searchDrink(name) {
      const endpoint = 'cocktails/';
      return axios.get(SERVER_URL + endpoint + name);
    }
 }

 export default new ApiService();