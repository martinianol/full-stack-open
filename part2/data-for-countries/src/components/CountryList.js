import React from "react"

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

export default CountryList