import React from "react";

const Countries = ({ countries }) => {
  console.log(countries)
  if (countries.length > 10) {
    return (
      <p>Too many matches, please be more specific</p>
    )
  } else if (countries.length > 1) {
    return (
      countries.map(country => {
        return (<p key={country.name.common}>{country.name.common}</p>)
      })

    )
  } else if (countries.length === 1) {
    const languages = Object.keys(countries[0].languages).map((key) => [key, countries[0].languages[key]]);
    console.log(languages);
    return (
      <div>
        {<h2>{countries[0].name.common}</h2>}
        <p>Capital {countries[0].capital[0]}</p>
        <p>Population {countries[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map(language => {
            return (<li key={language[0]}>{language[1]}</li>)
          })}
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