import React, { useState, useEffect } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SearchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(16);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    <div className="font-sans p-5 bg-white text-center">
      <header className="flex flex-col items-center mb-8">
        <div className="text-2xl font-bold mb-3 text-gray-800">
          <span>🌍</span>
          <span className="ml-2">Geonova</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="p-3 w-2/3 max-w-lg border border-gray-300 rounded-md text-lg"
            type="text"
            placeholder="Search country e.g. Indonesia"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </header>

      <div className="my-5 text-lg">
        <span>Find by Country Name: </span>
        {alphabet.map((char) => (
          <a
            key={char}
            href="#"
            onClick={() => handleLetterClick(char)}
            className="mx-2 text-blue-600 hover:underline"
          >
            {char}
          </a>
        ))}
      </div>

      {error && <div className="text-red-600 mt-5">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
        {currentCountries.length === 0 ? (
          <p className="col-span-full">No countries found. Try a different search or filter.</p>
        ) : (
          currentCountries.map((country) => (
            <div
              key={country.cca3}
              className="relative p-4 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full rounded-md mb-4"
              />
              <div className="font-semibold">{country.name.common}</div>
              <button
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-md opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => setSelectedCountry(country)}
              >
                More Info
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="p-3 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-3 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <footer className="mt-10 pt-5 border-t border-gray-200">
        <div className="text-gray-700">
          <a href="#africa" className="text-blue-600 hover:underline">Africa</a> |
          <a href="#asia" className="text-blue-600 hover:underline">Asia</a> |
          <a href="#oceania" className="text-blue-600 hover:underline">Australia-Oceania</a> |
          <a href="#americas" className="text-blue-600 hover:underline">The Americas</a> |
          <a href="#europe" className="text-blue-600 hover:underline">Europe</a>
        </div>
        <div className="mt-3 text-sm text-gray-500">One World - Nations Online</div>
      </footer>

      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500"
              onClick={() => setSelectedCountry(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedCountry.name.common} - Details</h2>
            <img
              src={selectedCountry.flags.png}
              alt={`${selectedCountry.name.common} flag`}
              className="w-32 mb-4 mx-auto"
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
