import { React, useState, useEffect } from "react";
import axios from 'axios';

import Countries from "./components/Countries";
import SearchCountry from "./components/SearchCountry";

const App = () => {
  const [countryToFind, setCountryToFind] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let countriesFound = response.data

        let countriesFiltered = countriesFound.filter(country => country.name.common.toLowerCase().includes(countryToFind.toLowerCase()))

        setCountries(countriesFiltered)
      })
  }, [countryToFind])


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
      <Countries countries={countries} showCountry={showCountry} />
    </div>
  );
}

export default App;
