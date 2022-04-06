import ApiService from '../Service/api'
import React, { useEffect, useState } from 'react';
import CompTemp from './CompTemp';
import { Button } from '@mui/material';

const RandomDrink = (props) => {
   const virgin = props.virgin;
   
   const [randomDrink, setRandomDrink] = useState();

   //Need this to show a drink if I open the page
   useEffect(() => {
      handleClick();
   }, [virgin]);


   //Handle button click, call the ApiService.randomDrink and set the data for the variable
   const handleClick = async() => {
      const res = await ApiService.randomDrink(virgin);
      setRandomDrink(res.data);
   }

   return ( 
         randomDrink && 
         <div className="bg-green-200">                       
            <CompTemp style={{margin: "auto"}} drink={randomDrink} />
            <Button className='bg-blue-200' onClick={() => handleClick()}>Give new random</Button>
         </div>
    );
}
 
export default RandomDrink;