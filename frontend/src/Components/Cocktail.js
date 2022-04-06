const Cocktail = (props) => {
   const drink = props.drink;
   
   return ( 
      <div>
         {drink &&                         
            <table className="inline-block mr-5">
               <tbody className="bg-blue-200 w-auto h-auto">
               <h2 className='mb-10'>{drink.strDrink}</h2>
               <div>
                  <div className='w-1/4 ml-10 m-2 float-left'>
                  <tr>
                     <th className="p-3">Hozzávalók</th>
                  </tr>
                     {Object.entries(drink)
                        .filter(x => x[0].startsWith('strIngredient') && (x[1] != null && x[1] != ""))
                           .map((ingredien, i) => {
                              return(
                                 <tr >
                                    <td key={i} className="p-1 pr-3">{ingredien[1] + '  ||  ' + drink['strMeasure'+(i+1)]}</td>
                                 </tr> 
                              )
                           })
                        }
               </div>
               <div className='w-2/3 float-right'>
                  <td className='mb-20 w-1/2 align-middle'>{drink.strInstructions}</td>
                     <td>
                        <img 
                           src={drink.strDrinkThumb} 
                           alt='drink'
                           className='w-64 h-64 p-10 inline'
                        />
                     </td>
                  </div>
                  </div>
               </tbody>
            </table>    
         }
      </div>
    );
}
 
export default Cocktail;
