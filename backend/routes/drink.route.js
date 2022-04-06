const express = require("express");
const router = express.Router();
const request = require('request');

const { json } = require("body-parser");

router.get("/cocktail/:virgin", (req, res) => {
   if(req.params.virgin){
      request.get('https://thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){

            const rand = Math.floor(Math.random()*JSON.parse(body).drinks.length);
            const drinkID = JSON.parse(body).drinks[rand].idDrink;          
            
            request.get('https://thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
                  console.log("virgin drink");
                  return;
               }else{
                  console.log(err);
               }
            }) 
         } else {
            console.log(err);
         }
      }) 
   }else{
      request.get('https://thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic', (err, response, body) => {
         if(!err && res.statusCode === 200){
            const rand = Math.floor(Math.random()*JSON.parse(body).drinks.length);
            const drinkID = JSON.parse(body).drinks[rand].idDrink;          
            
            request.get('https://thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID, (err, response, body) => {
               if(!err && res.statusCode === 200){
                  res.json(JSON.parse(body).drinks[0]);
                  console.log("alcoholic drink");
                  return;
               }else{
                  console.log(err);
               }
            }) 
         } else {
            console.log(err);
         }
      }) 
   }
});

router.post("/cocktails/:name", (req, res) => {
   request.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + req.params.name, (err, response, body) => {
      if(!err && res.statusCode === 200){
         res.json(JSON.parse(body).drinks);
         console.log('Drinks searched by name');
      } else {
         console.log(err);
      }
   }) 
});


module.exports = router;