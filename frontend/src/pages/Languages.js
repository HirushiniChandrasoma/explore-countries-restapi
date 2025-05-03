import React, { useEffect, useState } from 'react';
import bg from '../images/img_back.jpg';

export default function Languages() {
  const [countriesData, setCountriesData] = useState([]);
  const [languagesMap, setLanguagesMap] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const languagesPerPage = 10;

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

  // Pagination logic
  const indexOfLastLanguage = currentPage * languagesPerPage;
  const indexOfFirstLanguage = indexOfLastLanguage - languagesPerPage;
  const currentLanguages = filteredLanguages.slice(indexOfFirstLanguage, indexOfLastLanguage);

  const totalLanguages = filteredLanguages.length;
  const totalPages = Math.ceil(totalLanguages / languagesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Check if a language is spoken in the selected region
  const getNoCountriesMessage = (lang) => {
    if (selectedLanguage && regionFilter) {
      const countries = filteredCountries(lang);
      if (countries.length === 0) {
        return `${lang} is not spoken in ${regionFilter}`;
      }
    }
    return null;
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto relative">
      {/* Apply background to the body globally and apply blur to only the background */}
      <style>
        {`
          body {
            background-image: url(${bg});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            height: 100vh;
            margin: 0;
          }

          /* Apply blur effect only to the background */
          .background-blur {
            position: absolute;
            inset: 0;
            background-image: url(${bg});
            background-size: cover;
            background-position: center;
            filter: blur(8px); /* Adjust blur amount */
            z-index: -1; /* Ensure the content is above the blurred background */
          }
        `}
      </style>

      {/* Background with blur effect */}
      <div className="background-blur"></div>

      {/* Header with clear background */}
      <div className="relative z-10 mb-8">
        {/* Header Text Section */}
        <div className="relative z-20 text-center p-6">
          <h2 className="text-5xl font-semibold mb-5 text-white shadow-lg shadow-black p-3 inline-block bg-opacity-50 bg-black rounded-md">
            Languages of the World
          </h2>
        </div>
      </div>

      <div className="relative z-10">
        {/* Search and Filter Section */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          {/* Label for language input */}
          <label
            htmlFor="search"
            className="text-white font-semibold p-2 bg-blue-500 rounded-md"
          >
            Language
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search language..."
            value={searchInput}
            onChange={handleSearchChange}
            className="p-2 w-48 border rounded-md"
          />

          {/* Continent filter */}
          <div className="ml-auto flex items-center gap-2">
            <label
              htmlFor="region"
              className="text-white font-semibold p-2 bg-green-500 rounded-md"
            >
              Continent
            </label>
            <select
              id="region"
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
        </div>

        {/* Languages List Section */}
        <div className="space-y-6">
          {currentLanguages.map((lang) => (
            <div key={lang} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl">
              <h3
                onClick={() => {
                  if (selectedLanguage === lang) {
                    setSelectedLanguage(null); // Hide countries if the same language is clicked twice
                  } else {
                    setSelectedLanguage(lang); // Show countries if language is clicked once
                  }
                }}
                className="text-blue-500 cursor-pointer hover:underline font-bold"
              >
                {lang}
              </h3>

              {selectedLanguage === lang && (
                <div className="mt-4">
                  <h4 className="font-semibold">Spoken in:</h4>
                  {/* Check if there are countries for the selected language and region */}
                  {getNoCountriesMessage(lang) ? (
                    <div className="text-red-500 font-semibold">{getNoCountriesMessage(lang)}</div>
                  ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {filteredCountries(lang).map((country) => (
                        <li
                          key={country.cca3}
                          className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-md"
                        >
                          <img
                            src={country.flags.png}
                            alt={country.name.common}
                            className="mx-auto mb-4 w-24 h-16 object-contain"
                          />
                          {country.name.common}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-blue-800 text-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="mx-2 text-white">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-blue-800 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
