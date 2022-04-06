const Cocktail = (props) => {
   const drink = props.drink;
   
   return (    
      <div className="h-96">
      <h2 className=''>{drink.strDrink}</h2>                      
         <table className="w-1/3 inline-block p-20">      
            <tbody className="bg-blue-200">
            <tr>
               <th className="m-5">Hozzávalók</th>
            </tr>
               {Object.entries(drink)
                  .filter(x => x[0].startsWith('strIngredient') && (x[1] != null && x[1] != ""))
                     .map((ingredien, i) => {
                        return(
                           <tr key={i}>
                              <td className="">{ingredien[1] + '  ||  ' + drink['strMeasure'+(i+1)]}</td>
                           </tr> 
                        )
                     })
                  }
            </tbody>
         </table> 
         <div className='w-2/3 h-72 float-right bg-red-200'>
            <div className="w-1/2 float-left p-10">
               {drink.strInstructions}
            </div>
            <div className="w-1/2 float-right">
            <img 
               src={drink.strDrinkThumb} 
               alt='drink'
               className="w-80 h-80 float-right mr-20"
               />
            </div>   
         </div>
      </div>        
   );
}
 
export default Cocktail;
