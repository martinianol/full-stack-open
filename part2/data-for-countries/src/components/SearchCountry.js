import React from 'react';

const SearchCountry = ({ countryToFind, handleCountryInput }) => {
  return (
    <div>
      Find countries <input value={countryToFind} onChange={handleCountryInput} />
    </div>
  )
}

export default SearchCountry
