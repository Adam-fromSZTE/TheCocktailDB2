import ApiService from '../Service/api'
import React, { useState } from 'react';

const Drink = () => {
   const [randomDrink, setRandomDrink] = useState();

   const handleClick = () => {
      ApiService.randomDrink().then(res => setRandomDrink(res.data));
   }

   return ( 
      <div>
         <div>{JSON.stringify(randomDrink)}</div>
         <button onClick={() => handleClick()}>Click me</button>
      </div>

    );
}
 
export default Drink;