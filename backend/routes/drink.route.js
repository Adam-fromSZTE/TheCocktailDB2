const express = require("express");
const router = express.Router();
const axios = require('axios');


//Get a random cocktail
router.get("/cocktail/random/:virgin", (req, res, next) => {
   //if the virgin option is false, then collect all the virgin cocktails, then choose a random and get the data from the id
   if(req.params.virgin == "false"){
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic').then((result) => {
         const drinks = result.data.drinks;   //all the alcoholic drink
         const rDrink = drinks[Math.floor(Math.random()*drinks.length)];   //random alcoholic drink
         //collect info from the random alcoholic drink by ID          
         axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink).then((result) => {
            res.json(result.data.drinks[0]);
            console.log("The random alcoholic drink was send to the frontend, the drink name was: " + result.data.drinks[0].strDrink);
         }).catch((err) => {
            console.log(err);
         });
      }).catch((err) => {
         console.log(err);
      }); 
   }
   //if the virgin option is true, then collect all the virgin cocktails, then choose a random and get the data from the id
   else if(req.params.virgin == "true"){
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic').then((result) => {
         const drinks = result.data.drinks;   //all the alcoholic drink
         const rDrink = drinks[Math.floor(Math.random()*drinks.length)];   //random alcoholic drink
         //collect info from the random alcoholic drink by ID          
         axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink).then((result) => {
            res.json(result.data.drinks[0]);
            console.log("The random alcoholic drink was send to the frontend, the drink name was: " + result.data.drinks[0].strDrink);
         }).catch((err) => {
            console.log(err);
         });
      }).catch((err) => {
         console.log(err);
      }); 
   }
   else{
      console.log("Error: The virgin value is bad");
   } 
});

//Cocktails searched by name
router.get(["/cocktails/search/name/:name", "/cocktails/"], (req, res, next) => {
   axios.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + req.params.name).then((result) => {
      if(req.params.name == undefined || req.params.name.length <= 1) {
         res.json([]);
      } else {
         console.log("Cocktails searched by name, the name was: " + req.params.name)
         res.json(result.data.drinks);
      } 
   }).catch((err) => {
      console.log(err);
   });   
});

//Dropdown search
router.post("/cocktails/search/dropdown", async (req, res, next) => {

   const drinkIds = await axios.get("https://thecocktaildb.com/api/json/v1/1/filter.php?" + req.body.option[0] + "=" + req.body.value.replace(' ', '_'))
      .then(res => res.data.drinks.map(drink => drink.idDrink))
      .catch(err => console.log(err));

   const drinks = await Promise.all(
      drinkIds.map(async drinkId => {
         return axios.get("https://thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId)
            .then(res => res.data.drinks[0])
            .catch(err => console.log(err));   
      })
   )
   res.json(drinks); 
})


//Dropdown option choose
router.get("/cocktails/choose/dropdown/:value", (req, res, next) => {
   axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?" + req.params.value[0] + "=list").then((result) => {
      console.log("Dropdown options was send to the frontend, the main value was: " + req.params.value);
         res.json(result.data.drinks.map((drink)=> {
            return {value: Object.values(drink)[0], label: Object.values(drink)[0]};
         }))
   }).catch((err) => {
      console.log(err);
   });
})



module.exports = router;