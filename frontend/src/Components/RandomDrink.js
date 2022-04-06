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
         randomDrink && 
         <div className="bg-green-200">                       
            <Cocktail drink={randomDrink} />
            <button className='bg-blue-200' onClick={() => handleClick()}>Click me</button>
         </div>
    );
}
 
export default RandomDrink;