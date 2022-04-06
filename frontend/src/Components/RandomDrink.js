import ApiService from '../Service/api'
import React, { useEffect, useState } from 'react';
import Cocktail from './Cocktail';

const RandomDrink = (props) => {
   const drink = props.drink;
   
   const [randomDrink, setRandomDrink] = useState();

   //Need this to show a drink if I open the page
   useEffect(() => {
      handleClick();
    }, []);


   //Handle button click, call the ApiService.randomDrink and set the data for the variable
   const handleClick = () => {
      ApiService.randomDrink().then(res => setRandomDrink(res.data));
   }

   return ( 
      <div>
         {randomDrink && 
         <div className="bg-grey-200 h-auto w-auto">                       
            <Cocktail drink={randomDrink.drinks[0]} />
         </div>
         }
         <button onClick={() => handleClick()}>Click me</button>
      </div>

    );
}
 
export default RandomDrink;