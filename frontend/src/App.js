import { useRef } from "react";
import "./App.css";
import Header from "./Components/Header";
import RandomDrink from "./Components/RandomDrink";
import SearchDrink from "./Components/SearchDrink";

function App() {
  return (
    <div className="App">
      <Header />
      <RandomDrink />
      <SearchDrink />
    </div>
  );
}

export default App;
