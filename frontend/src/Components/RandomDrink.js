import ApiService from "../Service/api";
import React, { useEffect, useState } from "react";
import Cocktail from "./Cocktail";
import { FormControlLabel, Switch } from "@mui/material";
import { CircleSpinner } from "react-spinners-kit";

const RandomDrink = () => {
  const [randomDrink, setRandomDrink] = useState();
  const [virgin, setVirgin] = useState(false);
  const [haveRandomDrink, setHaveRandomDrink] = useState(false);

  //Need this to show a drink if I open the page
  useEffect(() => {
    handleNewRandomDrink();
  }, [virgin]);

  useEffect(() => {
    setHaveRandomDrink(true);
  }, [randomDrink]);

  const handleVirginSwitch = async () => {
    setVirgin(!virgin);
  };

  //Handle button click (async)
  const handleNewRandomDrink = async () => {
    setHaveRandomDrink(false);

    const res = await ApiService.randomDrink(virgin);
    setRandomDrink(res.data);
  };

  //I give in props a drink to the Cocktail component
  return (
    randomDrink && (
      <div className="bg-gray-400 mx-10 p-2 rounded-lg">
        {haveRandomDrink ? <Cocktail drink={randomDrink} /> : <CircleSpinner className="m-auto" />}
        <button
          className="bg-neutral-300 w-auto p-2 my-2 rounded-full transition duration-700 hover:bg-neutral-500 hover:scale-110"
          onClick={() => handleNewRandomDrink()}
        >
          Give new random
        </button>
        <FormControlLabel
          className="pl-4"
          value={virgin}
          control={<Switch color="primary" />}
          label="Virgin cocktail"
          labelPlacement="end"
          onClick={() => handleVirginSwitch()}
        />
      </div>
    )
  );
};

export default RandomDrink;
