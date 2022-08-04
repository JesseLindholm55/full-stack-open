import {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './components/Country/Country'
import SingleCountry from './components/SingleCountry/SingleCountry'

const App = () => {
  const [filter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(0)

  const countriesToShow = countries.filter(country => country.name.common.includes(filter))

  const tooMany = <div>Too many countries</div>

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    //checkCountriesTotal()
    
    
  }

  const checkCountriesTotal = () => {
    if (countriesToShow.length < 10) {
      if (countriesToShow.length === 1) setShowCountries(2)
      else setShowCountries(1)
    }
    else setShowCountries(0)
  }

  useEffect(checkCountriesTotal, [countriesToShow.length])

  


  const getCountries = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(result => {
      setCountries(result.data)
    })
  }

  useEffect(getCountries, [])

  return (
    <div className="App">
      <div>find countries</div>
      <input type="text" value={filter} onChange={handleFilterChange} />
      <div>
        {showCountries === 1 ? 
        countriesToShow.map(country => 
            <Country country={country} key={country.name.common}/>
        ) 
        : showCountries === 2 ? <SingleCountry country={countriesToShow[0]}/>
        : tooMany}
      </div>
    </div>
  );
}

export default App;
