import axios from "axios";
import SERVER_URL from "../Service/serverUrl";

class ApiService {
  //Api which make a get to the server
  randomDrink(virgin) {
    const endpoint = "cocktail/random/";
    return axios.get(SERVER_URL + endpoint + virgin);
  }

  //Api which make a get to the server, in the query I give the name variable
  searchDrink(name) {
    const endpoint = "cocktails/search/name/";
    return axios.get(SERVER_URL + endpoint + name);
  }

  //First dropdown optinos choose
  chooseDropdown(value) {
    const endpoint = "cocktails/choose/dropdown/";
    return axios.get(SERVER_URL + endpoint + value);
  }

  //Search button if the 2 dropdown have value
  searchDropdown(value) {
    console.log(value);
    const endpoint = "cocktails/search/dropdown";
    return axios.post(SERVER_URL + endpoint, {
      option: value.option,
      value: value.value
    });
  }
}

export default new ApiService();
