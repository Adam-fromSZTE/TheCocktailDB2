import { useEffect, useState } from "react";
import ApiService from "../Service/api"
import TextField from "@mui/material/TextField"
import CompTemp from "./CompTemp";
import { Button, Card, Grid, Checkbox } from "@mui/material";


const SearchDrink = (props) => {
   const [text, setText] = useState();
   const [drinkList, setDrinkList] = useState();

   const virgin = props.virgin;
   const setVirgin = props.setVirgin;

   const handleClick = async() => {
      const res  = await ApiService.searchDrink(text, virgin);
      setDrinkList(res.data)
   };

   useEffect(() => {
      console.log(drinkList)
   } , [drinkList])
   
   return ( 
      <div className="items-center flex">
         <Card>
            <TextField onChange={(e) => setText(e.target.value)} id="outlined-basic" variant="filled" />
            <Checkbox onChange={(e) => setVirgin(e.target.value)}/>
            <Button variant="contained" onClick={() => handleClick()}>Search</Button>
         </Card>
         <Grid container spacing={5}>
            {drinkList &&
               drinkList.map((drink, i) => {                  
                  return <CompTemp drink={drink} key={i}/>;             
               })
            }        
         </Grid>
      </div>
   );
}
 
export default SearchDrink;