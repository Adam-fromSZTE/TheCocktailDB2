import axios from "axios";
import SERVER_URL from "../Service/serverUrl";

class ApiService {
  //Api which make a get to the server
  randomDrink(virgin) {
    const endpoint = "cocktail/";
    return axios.get(SERVER_URL + endpoint + virgin);
  }

  //Api which make a get to the server, in the query I give the name variable
  searchDrink(name) {
    const endpoint = "cocktails/search/";
    return axios.get(SERVER_URL + endpoint + name);
  }

  searchDropdown(value) {
    const endpoint = "cocktails/dropdown/";
    return axios.get(SERVER_URL + endpoint + value);
  }
}

export default new ApiService();
