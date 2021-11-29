import React from "react"

const CountryInfo = ({ country, languages, weather }) => {

  if (weather.main) {
    return (
      <div>
        {<h2>{country.name.common}</h2>}
        <p>Capital {country.capital[0]}</p>
        <p>Population {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => {
            return (<li key={language[0]}>{language[1]}</li>)
          })}
        </ul>
        <img src={country.flags.png} alt="Country Flag" />
        <h2>Wheather in {country.capital[0]}</h2>
        <div>
          <p>temperature {Math.round(Number(weather.main.temp))} Celsius</p>
          <p>wind {weather.wind.speed} </p>
        </div>
      </div>
    )
  }
  return (
    <div>
      {<h2>{country.name.common}</h2>}
      <p>Capital {country.capital[0]}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => {
          return (<li key={language[0]}>{language[1]}</li>)
        })}
      </ul>
      <img src={country.flags.png} alt="Country Flag" />
      <h2>Wheather in {country.capital[0]}</h2>
    </div>
  )
}

export default CountryInfo