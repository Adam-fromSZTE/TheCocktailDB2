const express = require("express");
const router = express.Router();
const request = require('request');

const { json } = require("body-parser");

//Get a random cocktail
router.get("/cocktail/:virgin", (req, res, next) => {
   request.get('https://thecocktaildb.com/api/json/v1/1/random.php', (err, response, body) => {
      if(!err && res.statusCode === 200){
         res.json(JSON.parse(body).drinks[0]);
         console.log('Random drink sent to the frontend, virgin: ' + req.params.virgin);
      } else {
         console.log(err);
      }
   }) 
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