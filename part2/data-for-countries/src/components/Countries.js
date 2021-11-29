import React from "react";

const Language = ({ language }) => {
  return (<li>{language}</li>)
}

const CountryList = ({ countries, showCountry }) => {
  return (
    countries.map(country => {
      return (
        <div key={country.name.common}>
          <p> {country.name.common}</p>
          <button onClick={() => showCountry(country.name.common)}>Show Country</button>
        </div>
      )
    })
  )
}

const Countries = ({ countries, showCountry }) => {
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
      <div>
        {<h2>{countries[0].name.common}</h2>}
        <p>Capital {countries[0].capital[0]}</p>
        <p>Population {countries[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) =>
            <Language key={language[0]} language={language[1]} />
          )}
        </ul>
        <img src={countries[0].flags.png} alt="Country Flag" />
      </div>
    )
  } else {
    return (
      <p>No country found</p>
    )
  }

}

export default Countries