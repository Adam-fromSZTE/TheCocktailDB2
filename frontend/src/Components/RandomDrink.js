import ApiService from '../Service/api'
import React, { useEffect, useState } from 'react';
import Cocktail from './Cocktail';
import { Checkbox, Chip, FormControlLabel, FormGroup, Stack, Switch } from '@mui/material/node';


const RandomDrink = (props) => { 
   const [randomDrink, setRandomDrink] = useState();
   const [virgin, setVirgin] = useState(false);

   //Need this to show a drink if I open the page
   useEffect(() => {
      handleNewRandomDrink();
   }, []);


   //Handle button click (async)
   const handleNewRandomDrink = async() => {
      const res = await ApiService.randomDrink(virgin);
      setRandomDrink(res.data);
   }


   const handleVirginSwitch = async() => {
      setVirgin(!virgin)
   }

   //I give in props a drink to the Cocktail component
   return ( 
         randomDrink && 
         <div className='bg-gray-400 bg-blend-lighten'>
            <div>
               <FormControlLabel
                  value={virgin}
                  control={<Switch color="primary" />}
                  label="Virgin cocktails"
                  labelPlacement="start"
                  onClick={() => handleVirginSwitch()}
               />
            </div>
            <Cocktail drink={randomDrink}/>
            <button 
            className='bg-neutral-300 w-auto p-2 my-2 rounded-full transition duration-700 hover:bg-neutral-500 hover:scale-110' 
            onClick={() => handleNewRandomDrink()}>Give new random
            </button>    
         </div>
    );
}
 
export default RandomDrink;