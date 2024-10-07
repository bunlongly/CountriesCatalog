import React, { useEffect } from 'react';

const CountryModal = ({ country, onClose }) => {
  useEffect(() => {
    // Lock the background scroll
    document.body.style.overflow = 'hidden';

    // Cleanup function to re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array to run only once on mount and unmount

  // Early return if there's no country data, not inside useEffect
  if (!country) return null;


  const getNativeName = nativeNames => {
    const firstKey = Object.keys(nativeNames)[0]; // Get the first available native name key
    return nativeNames[firstKey]?.official || 'No native name available';
  };

  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <h2>{country.name.official}</h2>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.official}`}
          style={{ width: '100px', borderRadius: '5px' }}
        />
        <p>Country Code (2 char): {country.cca2}</p>
        <p>Country Code (3 char): {country.cca3}</p>
        <p>Native Name: {getNativeName(country.name.nativeName)}</p>
        <p>Alternative Names: {country.altSpellings.join(', ')}</p>
        <p>
          Calling Codes: {country.idd.root}
          {country.idd.suffixes?.join(', ')}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CountryModal;
