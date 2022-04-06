import { useEffect, useState } from "react";
import ApiService from "../Service/api"
import TextField from "@mui/material/TextField"
import CompTemp from "./CompTemp";
import { Button, Card, Grid, Checkbox } from "@mui/material";


const SearchDrink = (props) => {
   const [text, setText] = useState();
   const [drinkList, setDrinkList] = useState();

   const handleClick = async() => {
      const res  = await ApiService.searchDrink(text);
      setDrinkList(res.data)
   };

   useEffect(() => {
      console.log(drinkList)
   } , [drinkList])
   
   return ( 
      <div className="items-center">
         <div className="mb-20">
            <Card>
               <TextField onChange={(e) => setText(e.target.value)} id="outlined-basic" variant="filled" />
               <Button variant="contained" onClick={() => handleClick()}>Search</Button>
            </Card>
         </div>
         <div className="m-auto">
            <Grid style={{justifyContent: "center"}} container gap={2} spacing={1}>
               {drinkList &&
                  drinkList.map((drink, i) => {                  
                     return <CompTemp drink={drink} key={i}/>;             
                  })
               }        
            </Grid>
         </div>
      </div>
   );
}

export default SearchDrink;