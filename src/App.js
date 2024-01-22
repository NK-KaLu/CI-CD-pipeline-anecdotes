import { useState, useEffect } from 'react'
import countryService from './services/countries'


const App = () => {


const api_key = process.env.REACT_APP_API_KEY
const [countries, setCountries] = useState([])
const [newFilter, setNewFilter] = useState('')
const[dataFetched, setDataFetched] = useState(false)
const[weatherData, setWeatherData] = useState({
  "weather":[
    {

       "description":"overcast clouds",
       "icon":"04d"
    }
 ],
 "main":{
    "temp":-6.55,
 },
 "wind":{
    "speed":4.63,
 },
 "name":"Tampere",
})

useEffect(() => {
  console.log('effect')
  countryService
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}, [])



const fetchWeatherData = async(city) => {
  setDataFetched(true)
  try{
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' 
  + city +'&appid='+ api_key+'&units=metric');
  const weatherJson = await response.json();
  setWeatherData(weatherJson);

  }catch(err){console.log("error in fetching")}
}





const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
  setDataFetched(false)
}

const FilterCountries = () =>{
  let filtered = countries.filter(coutry => coutry.name.common.toUpperCase().match(newFilter.toUpperCase()))
    filtered.map(filteredCountry => console.log(filteredCountry.name.common))
    
    if(filtered.length === 1){
      let Cntr = filtered[0]
      if(dataFetched === false){
      fetchWeatherData(Cntr.capital)
      }
      return(
        <div>

          <h2>{Cntr.name.common}</h2>

          <p>capital {Cntr.capital}</p> 
          <p>area {Cntr.area}</p>

          <h3>languages:</h3>

          {Object.keys(Cntr.languages).map((key, i) => (
            
            <ul>
              <li key={i}>
                <span>{Cntr.languages[key]}</span>
              </li>
            </ul>
            
            ))}
            
          <img src={Cntr.flags['png']} maxwidth={250} maxheight={250} alt='Flag loading failed...'></img>
            
          <h2>Weather in {Cntr.capital}</h2>
            
          <p>temperature {weatherData.main.temp} Celcius</p>

          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>

          <p>wind {weatherData.wind.speed} m/s</p>
       
          
          </div>


      )


    }
    else if(filtered.length < 11){
    return(     
        filtered.map(filteredCountry => 
          
          <ul>

            <p>
              {filteredCountry.name.common} <button onClick={() => handleClick(filteredCountry.name.common)}>show</button>
            </p>
        
          </ul>
          
          )
    )}else{return(<p>Too many matches, specify another filter</p>)}
}



const handleClick  = (filtered) => {
console.log(filtered)
setNewFilter(filtered)
  
}


  return (
    <div>

      <p>find countries <input value={newFilter} onChange={handleFilterChange}/></p>

      <div>
        <FilterCountries/>
    

      </div>

    </div>
  );
}

export default App;
