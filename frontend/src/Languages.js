import React, { useEffect, useState } from 'react';

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

  return (
    <div className="p-5 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-5">Languages of the World</h2>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search language..."
          value={searchInput}
          onChange={handleSearchChange}
          className="p-2 w-48 border rounded-md"
        />

        <select
          onChange={(e) => setRegionFilter(e.target.value)}
          value={regionFilter}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Region</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filteredLanguages.map((lang) => (
          <div key={lang} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl">
            <h3
              onClick={() => setSelectedLanguage(lang)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {lang}
            </h3>

            {selectedLanguage === lang && (
              <div className="mt-4">
                <h4 className="font-semibold">Spoken in:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {filteredCountries(lang).map((country) => (
                    <li
                      key={country.cca3}
                      className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <img
                        src={country.flags.png}
                        alt={country.name.common}
                        width="20"
                        className="mx-auto mb-2"
                      />
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
