const express = require("express");
const router = express.Router();
const request = require('request');

const { json } = require("body-parser");

//Get a random cocktail
router.get("/cocktail/:virgin", (req, res, next) => {
   //if the virgin option is false, then collect all the virgin cocktails, then choose a random and get the data from the id
   if(req.params.virgin == "false"){
      request.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){
            const drinks = JSON.parse(body).drinks;   //all the alcoholic drink
            const rDrink = drinks[Math.floor(Math.random()*drinks.length)];   //random alcoholic drink
            //collect info from the random alcoholic drink by ID          
            request.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
                  console.log("The random alcoholic drink was send to the frontend, the drink name was: " + JSON.parse(body).drinks[0].strDrink);
            } else {
               console.log(err);
            }
         })
         } else {
            console.log(err);
         }
      })
   }
   //if the virgin option is true, then collect all the virgin cocktails, then choose a random and get the data from the id
   else if(req.params.virgin == "true"){
      request.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){
            const drinks = JSON.parse(body).drinks;   //all the virgin drink
            const rDrink = drinks[Math.floor(Math.random()*drinks.length)];   //random virgin drink
            //collect info from the random virgin drink by ID
            request.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
                  console.log("The random virgin drink was send to the frontend, the drink name was: " + JSON.parse(body).drinks[0].strDrink);
            } else {
               console.log(err);
            }
         })
         } else {
            console.log(err);
         }
      })
   }
   else{
      console.log("Error: The virgin value is bad");
   } 
});

//Cocktails searched by name
router.get(["/cocktails/search/:name", "/cocktails/"], (req, res, next) => {
   request.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + req.params.name, (err, response, body) => {
      if(!err && res.statusCode === 200) {
         if(req.params.name == undefined || req.params.name.length <= 1) {
            res.json([]);
         } else {
            console.log("Cocktails searched by name, the name was: " + req.params.name)
            res.json(JSON.parse(body).drinks);
         } 
      } else {
         console.log(err);
      }
   }) 
});

//Dropdown option search
router.get(["/cocktails/dropdown/:value"], (req, res, next) => {
   request.get("https://thecocktaildb.com/api/json/v1/1/list.php?" + req.params.value[0] + "=list", (err, response, body) => {
      if(!err && res.statusCode === 200) {
         console.log("Dropdown options was send to the frontend, the main value was: " + req.params.value);
         res.json(JSON.parse(body).drinks.map((drink)=> {
            return {value: Object.values(drink)[0], label: Object.values(drink)[0]};
         }))
      } else {
         console.log(err);
      }
   }) 
});

module.exports = router;