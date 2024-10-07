import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../api/countriesApi';
import CountryCard from '../card/CountryCard';

function CountryContainer() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    getCountries();
  }, []);

  return (
    <div>
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}

export default CountryContainer;
