import { useEffect, useState } from "react";
import ApiService from "../Service/api"
import Cocktail from "./Cocktail";

const SearchDrink = () => {
   const [text, setText] = useState();
   const [drinkList, setDrinkList] = useState();

   const handleClick = () => {
      ApiService.searchDrink(text).then(res => setDrinkList(res.data['drinks']));
   };
   
   return ( 
      <div className="m-20 bg-slate-300">
         <input onChange={(e) => setText(e.target.value)} type='text' placeholder="Write here the name"/>
         <button className="bg-green-200" onClick={() => handleClick()}>Search</button>
         <div>
            {drinkList &&
               drinkList.forEach(drink => {
                  <Cocktail drink={drink}/>
               })
            }        
         </div>
      </div>
   );
}
 
export default SearchDrink;