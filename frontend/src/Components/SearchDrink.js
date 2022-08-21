import { useEffect, useState } from "react";
import ApiService from "../Service/api";
import TextField from "@mui/material/TextField";
import { Card, Grid } from "@mui/material";
import Cocktail from "./Cocktail";
import { CircleSpinner } from "react-spinners-kit";
import React from "react";
import Select from "react-select";

const options = [
  { value: "categories", label: "Categories" },
  { value: "glass", label: "Glass" },
  { value: "ingredient", label: "Ingredient" },
];

const SearchDrink = () => {
  const [text, setText] = useState();
  const [drinkList, setDrinkList] = useState();
  const [haveDrinkList, setHaveDrinkList] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [dropdownOption, setDropdownOption] = useState({});
  const [dropdownValue, setDropdownValue] = useState({});

  //Handle button click (async)
  const handleNameSearch = async () => {
    setHaveDrinkList(false);

    const res = await ApiService.searchDrink(text);
    setDrinkList(res.data);
  };

  //Handle button click (async)
  const handleDropdownSearch = async () => {
    
    setHaveDrinkList(false);

    const res = await ApiService.searchDropdown({
      option: dropdownOption.value,
      value: dropdownValue.value,
    });

    setDrinkList(res.data);
  };

  const handleDropdownChoose = async (value) => {
    
    const res = await ApiService.chooseDropdown(value);

    setDropdown(res.data);
  };

  useEffect(() => {
    setHaveDrinkList(true);
  }, [drinkList]);

  useEffect(() => {
    setDropdownValue(dropdown[0]);
  }, [dropdown]);

  //I give in props a drink to the Cocktail component
  return (
    <Card>
      <div className="m-10 p-5 rounded-lg bg-gray-200 flex">
        <div className="m-auto w-auto flex">
          <div className="w-52 m-2">
            <Select
              options={options}
              value={dropdownOption}
              onChange={(e) => {
                handleDropdownChoose(e.value);
                setDropdownOption(e);
              }}
            />
          </div>
          <div className="w-52 m-2">
            <Select
              options={dropdown}
              value={dropdownValue}
              onChange={(e) => {
                setDropdownValue(e);
              }}
            />
          </div>
          <button
            className="bg-neutral-300 w-auto p-2 my-2 mx-2 rounded-full transition duration-700 hover:bg-neutral-500 hover:scale-110"
            onClick={() => handleDropdownSearch()}
          >
            Search
          </button>
        </div>
        <div className="m-auto w-auto flex">
          <TextField
            onChange={(e) => setText(e.target.value)}
            id="outlined-basic"
            variant="filled"
            placeholder="Search by name"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleNameSearch();
              }
            }}
          />
          <button
            className="bg-neutral-300 w-auto p-2 my-2 mx-2 rounded-full transition duration-700 hover:bg-neutral-500 hover:scale-110"
            onClick={() => handleNameSearch()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="bg-gray-400 m-10 p-5 rounded-lg">
        {haveDrinkList ? (
          <Grid container gap={2} spacing={1}>
            {drinkList &&
              drinkList.map((drink, i) => {
                return <Cocktail drink={drink} key={i} />;
              })}
          </Grid>
        ) : (
          <CircleSpinner />
        )}
      </div>
    </Card>
  );
};

export default SearchDrink;
