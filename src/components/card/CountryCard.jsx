import React from 'react';

const CountryCard = ({ country, onClick }) => {
  // Safely access native name with a fallback option
  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.official
    : 'No native name available';

  return (
    <div className='country-card' onClick={() => onClick(country)}>
      <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
      <h3>{country.name.official}</h3>
      <p>
        Country Code: {country.cca2} / {country.cca3}
      </p>
      <p>Native Name: {nativeName}</p>
      <p>Alternative Names: {country.altSpellings.join(', ')}</p>
      <p>
        Calling Codes: {country.idd.root}
        {country.idd.suffixes?.join(', ')}
      </p>
    </div>
  );
};

export default CountryCard;
