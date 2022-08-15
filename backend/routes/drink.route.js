const express = require("express");
const router = express.Router();
const request = require('request');

const { json } = require("body-parser");

//Get a random cocktail
router.get("/cocktail/:virgin", (req, res, next) => {
   if(req.params.virgin == "false"){
      request.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){
            const drinks = JSON.parse(body).drinks;
            const rDrink = drinks[Math.floor(Math.random()*drinks.length)];          
            request.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
            } else {
               console.log(err);
            }
         })
         } else {
            console.log(err);
         }
      })
   }
   else if(req.params.virgin == "true"){
      request.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){
            const drinks = JSON.parse(body).drinks;
            const rDrink = drinks[Math.floor(Math.random()*drinks.length)];
            request.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + rDrink.idDrink, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
                  console.log(JSON.parse(body).drinks[0]);
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
      console.log("else");
   }
    
});

//Cocktails searched by name
router.get("/cocktails/:name", (req, res, next) => {
   request.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + req.params.name, (err, response, body) => {
      if(!err && res.statusCode === 200){
         res.json(JSON.parse(body).drinks);
         console.log('Drinks searched by name: ' + req.params.name);
      } else {
         console.log(err);
      }
   }) 
});

module.exports = router;