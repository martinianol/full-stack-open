import { React } from "react";
import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";



const Countries = ({ countries, showCountry, weather }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, please be more specific</p>
    )
  } else if (countries.length > 1) {
    return (
      <CountryList countries={countries} showCountry={showCountry} />
    )
  } else if (countries.length === 1) {
    const languages = Object.keys(countries[0].languages).map((key) => [key, countries[0].languages[key]]);

    return (
      <CountryInfo country={countries[0]} languages={languages} weather={weather} />
    )
  } else {
    return (
      <p>No country found</p>
    )
  }

}

export default Countries