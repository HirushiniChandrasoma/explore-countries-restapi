import React, { useEffect, useState } from 'react';
import './Language.css';

export default function Languages() {
  const [countriesData, setCountriesData] = useState([]);
  const [languagesMap, setLanguagesMap] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  // Fetch countries and build languages map
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);

        const langMap = {};
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              if (!langMap[lang]) {
                langMap[lang] = [];
              }
              langMap[lang].push(country);
            });
          }
        });

        setLanguagesMap(langMap);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredLanguages = Object.keys(languagesMap).filter((lang) =>
    lang.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredCountries = (lang) => {
    let countries = languagesMap[lang] || [];
    if (regionFilter) {
      countries = countries.filter((c) => c.region === regionFilter);
    }
    if (countryFilter) {
      countries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
      );
    }
    return countries;
  };

  const uniqueRegions = [...new Set(countriesData.map((c) => c.region).filter(Boolean))];
  const uniqueCountries = [...new Set(countriesData.map((c) => c.name.common))];

  return (
    <div className="languages-container">
      <h2>Languages of the World</h2>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Search language..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <select onChange={(e) => setRegionFilter(e.target.value)} value={regionFilter}>
          <option value="">Filter by Region</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="languages-list">
        {filteredLanguages.map((lang) => (
          <div key={lang} className="language-block">
            <h3 onClick={() => setSelectedLanguage(lang)} className="language-name">
              {lang}
            </h3>

            {selectedLanguage === lang && (
              <div className="language-countries">
                <h4>Spoken in:</h4>
                <ul className="flag-row">
                  {filteredCountries(lang).map((country) => (
                    <li key={country.cca3}className="flag-item">
                      <img src={country.flags.png} alt={country.name.common} width="20" />{' '}
                      {country.name.common}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
