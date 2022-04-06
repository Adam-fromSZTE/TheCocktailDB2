import ApiService from '../Service/api'
import React, { useEffect, useState } from 'react';
import CompTemp from './Cocktail';
import { Button } from '@mui/material';

const RandomDrink = (props) => { 
   const [randomDrink, setRandomDrink] = useState();

   //Need this to show a drink if I open the page
   useEffect(() => {
      handleClick();
   }, []);


   //Handle button click (async)
   const handleClick = async() => {
      const res = await ApiService.randomDrink();
      setRandomDrink(res.data);
   }

   //I give in props a drink to the Cocktail component
   return ( 
         randomDrink && 
         <div className="bg-green-200">                   
            <CompTemp style={{margin: "auto"}} drink={randomDrink} />
            <Button className='bg-blue-200' onClick={() => handleClick()}>Give new random</Button>
         </div>
    );
}
 
export default RandomDrink;