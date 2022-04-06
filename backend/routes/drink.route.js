const express = require("express");
const router = express.Router();
const request = require('request');

const { json } = require("body-parser");

router.get("/random-drink", (req, res) => {
   request.get('https://thecocktaildb.com/api/json/v1/1/random.php', (err, response, body) => {
      if(!err && res.statusCode === 200){
         res.json(JSON.parse(body));
         console.log(JSON.parse(body));
      } else {
         console.log(err);
      }
   }) 
});

module.exports = router;