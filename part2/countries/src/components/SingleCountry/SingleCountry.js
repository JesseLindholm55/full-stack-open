import React, {useEffect, useState} from 'react';
import './SingleCountry.css';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const SingleCountry = (props) => {

  const [languages, setLanguages] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)

  const languageBase = () => {
    let allLanguages = []
    for (const language of Object.values(props.country.languages)) {
      allLanguages.push(language)
    }
    setLanguages(allLanguages)
  }

  const getWeatherInfo = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.country.latlng[0]}&lon=${props.country.latlng[1]}&appid=${api_key}`
    axios
    .get(url)
    .then(result => {
      setWeatherInfo(result.data)
      axios
      .get( `http://openweathermap.org/img/wn/10d@2x.png`)
      .then(result2 => {
        setWeatherIcon(result2.data)
      })
    })
    
    
  }

  useEffect(languageBase, [])
  useEffect(getWeatherInfo, [])

  
  
  return (
  <div className="SingleCountry">
    <h3 style={{fontWeigth: 'bold'}}>{props.country.name.common}</h3>
    <div>capital {props.country.capital[0]}</div>
    <div>area {props.country.area}</div>
    <div style={{fontWeight: 'bold'}}>languages</div>
    <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
    <img src={props.country.flags.png}/>
    <h3>Weather in {props.country.name.common}</h3>
    <div>{weatherInfo ? <div>temperature {weatherInfo.main.temp} (unknown degree)</div>: null}</div>
    <img src={weatherIcon}/>
    {weatherInfo ? <div>wind is {weatherInfo.wind.speed} m/s</div>: null}
  </div>
)};



export default SingleCountry;
