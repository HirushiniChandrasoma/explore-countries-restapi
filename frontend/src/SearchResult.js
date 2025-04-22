import React, { useEffect, useState } from 'react';
import './SearchResult.css';

const SearchResult = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('A');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      });
  }, []);

  useEffect(() => {
    const result = countries.filter((country) =>
      country.name.common.startsWith(selectedLetter)
    );
    setFilteredCountries(result);
  }, [selectedLetter, countries]);

  return (
    <div className="search-result-container">
      <header className="search-result-header">
        <div className="logo">🌐 CountryReports</div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search data e.g. GDP, population, Indonesia"
        />
      </header>

      <div className="alphabet-links">
        <span>Find by Country Name: </span>
        {alphabet.map((letter) => (
          <a
            key={letter}
            href="#"
            onClick={() => setSelectedLetter(letter)}
            className={selectedLetter === letter ? 'active-letter' : ''}
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="letter-heading" id={selectedLetter}>
        <h2>{selectedLetter}</h2>
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Scroll to Top
        </a>
      </div>

      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div className="country-card" key={country.cca3}>
            <img src={country.flags.png} alt={country.name.common} />
            <div className="country-name">{country.name.common}</div>
          </div>
        ))}
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
    </div>
  );
};

export default SearchResult;
