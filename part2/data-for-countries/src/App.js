import { React, useState, useEffect } from "react";
import axios from 'axios';

import Countries from "./components/Countries";
import SearchCountry from "./components/SearchCountry";

const App = () => {
  const [countryToFind, setCountryToFind] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('');

  const api_key = process.env.REACT_APP_API_KEY




  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let countriesFound = response.data

        let countriesFiltered = countriesFound.filter(country => country.name.common.toLowerCase().includes(countryToFind.toLowerCase()))



        if (countriesFiltered.length === 1) {
          setCity(countriesFiltered[0].capital[0].toLowerCase())
        }

        setCountries(countriesFiltered)
      })
  }, [countryToFind])

  useEffect(() => {
    if (city !== '') {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [city, api_key])



  const handleCountryInput = (event) => {
    setCountryToFind(event.target.value)
  }

  const showCountry = (country) => {
    setCountryToFind(country)
  }


  return (
    <div>
      <SearchCountry
        countryToFind={countryToFind}
        handleCountryInput={handleCountryInput}
      />
      <Countries countries={countries} showCountry={showCountry} weather={weather} />
    </div>
  );
}

export default App;
