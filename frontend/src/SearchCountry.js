import React, { useState, useEffect } from 'react';
import './SearchCountry.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SearchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(16);
  const [selectedCountry, setSelectedCountry] = useState(null); // For modal

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setFilteredCountries(sorted);
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries.');
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput) {
      const result = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCountries(result);
      setCurrentPage(1);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const filtered = countries.filter((country) =>
      country.name.common.startsWith(letter)
    );
    setFilteredCountries(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredCountries.length / countriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  return (
    <div className="search-country-container">
      <header className="search-header">
        <div className="logo">
          <span className="icon">🌍</span>
          <span className="logo-text">CountryReports</span>
        </div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search country e.g. Indonesia"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </header>

      <div className="alphabet-filter">
        <span>Find by Country Name: </span>
        {alphabet.map((char) => (
          <a key={char} href="#" onClick={() => handleLetterClick(char)} className="alpha-link">
            {char}
          </a>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="country-grid">
        {currentCountries.length === 0 ? (
          <p>No countries found. Try a different search or filter.</p>
        ) : (
          currentCountries.map((country) => (
            <div
              className="country-card"
              key={country.cca3}
              onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
            >
              <img src={country.flags.png} alt={country.name.common} />
              <div className="country-name">{country.name.common}</div>
              <button className="more-info-btn" onClick={() => setSelectedCountry(country)}>
                More Info
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>

      <footer className="search-footer">
        <div className="footer-links">
          <a href="#africa">Africa</a> | 
          <a href="#asia">Asia</a> | 
          <a href="#oceania">Australia-Oceania</a> | 
          <a href="#americas">The Americas</a> | 
          <a href="#europe">Europe</a>
        </div>
        <div className="footer-note">One World - Nations Online</div>
      </footer>

      {/* Modal Popup */}
      {selectedCountry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedCountry(null)}>✖</button>
            <h2>{selectedCountry.name.common} - Details</h2>
            <img
              src={selectedCountry.flags.png}
              alt={`${selectedCountry.name.common} flag`}
              className="detail-flag"
            />
            <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {
              selectedCountry.languages
                ? Object.values(selectedCountry.languages).join(', ')
                : 'N/A'
            }</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCountries;
