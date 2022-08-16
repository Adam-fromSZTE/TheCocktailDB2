import { useEffect, useState } from "react";
import ApiService from "../Service/api";
import TextField from "@mui/material/TextField";
import { Card, Grid } from "@mui/material";
import Cocktail from "./Cocktail";
import { GuardSpinner } from "react-spinners-kit";

const SearchDrink = () => {
  const [text, setText] = useState();
  const [drinkList, setDrinkList] = useState();
  const [haveDrinkList, setHaveDrinkList] = useState(false);

  //Handle button click (async)
  const handleClick = async () => {
    setHaveDrinkList(false);

    const res = await ApiService.searchDrink(text);
    setDrinkList(res.data);
  };

  useEffect(() => {
    setHaveDrinkList(true);
  }, [drinkList]);

  //I give in props a drink to the Cocktail component
  return (
    <div className="items-center">
      <div className="mb-20">
        <Card>
          <TextField
            onChange={(e) => setText(e.target.value)}
            id="outlined-basic"
            variant="filled"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleClick();
              }
            }}
          />
          <button
            className="bg-neutral-300 w-auto p-2 my-2 mx-2 rounded-full transition duration-700 hover:bg-neutral-500 hover:scale-110"
            onClick={() => handleClick()}
          >
            Search
          </button>
        </Card>
      </div>
      <div className="m-10">
        {haveDrinkList ? (
          <Grid
            style={{ justifyContent: "center" }}
            container
            gap={2}
            spacing={1}
          >
            {drinkList &&
              drinkList.map((drink, i) => {
                return <Cocktail drink={drink} key={i} />;
              })}
          </Grid>
        ) : (
         <GuardSpinner />
        )}
      </div>
    </div>
  );
};

export default SearchDrink;
