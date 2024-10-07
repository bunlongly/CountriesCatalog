import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../api/countriesApi';
import CountryCard from '../card/CountryCard';

const CountriesContainer = () => {
// storing all fetched countries initially
const [allCountries, setAllCountries] = useState([]);

//storing countries that may be filtered or sorted
const [countries, setCountries] = useState([]);

//storing the current search term input by the user
const [searchTerm, setSearchTerm] = useState('');

//storing the current sort order ('asc' for ascending or 'desc' for descending)
const [sortOrder, setSortOrder] = useState('asc');

//storing the current page number in the pagination
const [currentPage, setCurrentPage] = useState(1);


const itemsPerPage = 25;

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setAllCountries(data);
      setCountries(data); // Initialize with all data
    };
    getCountries();
  }, []);

  useEffect(() => {
    let filteredCountries = allCountries;

    if (searchTerm) {
      filteredCountries = allCountries.filter(country =>
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorts countries based on the official name in ascending or descending order
    filteredCountries = filteredCountries.sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.official.localeCompare(b.name.official) // Ascending sort
        : b.name.official.localeCompare(a.name.official); //Descending sort
    });

    setCountries(filteredCountries);
  }, [searchTerm, sortOrder, allCountries]);

  const handlePageChange = newPage => {
    const totalPages = Math.ceil(countries.length / itemsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCountries = countries.slice(startIndex, endIndex);

  return (
    <>
      <h1>Display Countries</h1>
      <div className='search-controls'>
        <input
          className='search'
          type='text'
          placeholder='Search by country name...'
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search change
          }}
        />
        <button onClick={() => setSortOrder('asc')}>Sort Ascending</button>
        <button onClick={() => setSortOrder('desc')}>Sort Descending</button>
      </div>
      <div className='countries-container'>
        {countries.length > 0 ? (
          displayedCountries.map(country => (
            <CountryCard
              key={country.cca3} // Assuming 'cca3' is a unique identifier
              country={country}
            />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
      {countries.length > 0 && (
        <div className='pagination-controls'>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {Math.ceil(countries.length / itemsPerPage)} |
            Showing {displayedCountries.length} of {countries.length} results
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(countries.length / itemsPerPage)
            }
          >
            Next
          </button>
          <button
            onClick={() =>
              handlePageChange(Math.ceil(countries.length / itemsPerPage))
            }
            disabled={
              currentPage === Math.ceil(countries.length / itemsPerPage)
            }
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default CountriesContainer;
