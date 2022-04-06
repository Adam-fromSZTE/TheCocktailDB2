import { useState } from 'react';
import './App.css';
import RandomDrink from './Components/RandomDrink';
import SearchDrink from './Components/SearchDrink';

function App() {
  const [virgin, setVirgin] = useState(false);
  
  return (
    <div className="App">
      <RandomDrink 
        virgin = {virgin}/>
      <SearchDrink 
        virgin = {virgin}
        setVirgin = {setVirgin}/>
    </div>
  );
}

export default App;
