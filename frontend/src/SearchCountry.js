import React, { useState } from 'react';
import './SearchCountry.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function SearchCountry() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

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
          placeholder="Search data e.g. GDP, population, Indonesia"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </header>

      <div className="alphabet-filter">
        <span>Find by Country Name: </span>
        {alphabet.map((char) => (
          <a key={char} href={`#${char}`} className="alpha-link">
            {char}
          </a>
        ))}
      </div>

      <div className="flag-map">
        {/* You can replace this with an actual image or interactive SVG */}
        <img
          src="/src/images/map.jpg"
          alt="World Map with Country Flags"
          className="world-map-img"
        />
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
}
