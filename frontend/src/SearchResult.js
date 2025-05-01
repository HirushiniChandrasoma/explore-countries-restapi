import React, { useEffect, useState } from 'react';

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
    <div className="font-sans p-5 text-center">
      {/* Header */}
      <header className="mb-5">
        <div className="text-3xl font-bold text-gray-800 mb-4">🌐 CountryReports</div>
        <input
          type="text"
          className="w-3/5 max-w-xl p-2 text-lg border rounded-md border-gray-300"
          placeholder="Search data e.g. GDP, population, Indonesia"
        />
      </header>

      {/* Alphabet Links */}
      <div className="mt-5 text-lg">
        <span>Find by Country Name: </span>
        {alphabet.map((letter) => (
          <a
            key={letter}
            href="#"
            onClick={() => setSelectedLetter(letter)}
            className={`mx-2 ${selectedLetter === letter ? 'font-semibold text-orange-600 underline' : 'text-blue-600'}`}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Letter Heading */}
      <div className="my-10 flex justify-center items-center gap-5">
        <h2 className="text-2xl">{selectedLetter}</h2>
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-blue-600 underline">
          Scroll to Top
        </a>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredCountries.map((country) => (
          <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden text-center shadow-md transition-transform duration-300 hover:scale-105">
            <img src={country.flags.png} alt={country.name.common} className="w-full h-32 object-cover" />
            <div className="p-3 font-medium text-sm">{country.name.common}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-10 pt-5 border-t border-gray-200">
        <div className="text-lg">
          <a href="#africa" className="text-blue-600 hover:underline">Africa</a> | 
          <a href="#asia" className="text-blue-600 hover:underline">Asia</a> | 
          <a href="#oceania" className="text-blue-600 hover:underline">Australia-Oceania</a> | 
          <a href="#americas" className="text-blue-600 hover:underline">The Americas</a> | 
          <a href="#europe" className="text-blue-600 hover:underline">Europe</a>
        </div>
        <div className="mt-3 text-sm text-gray-500">One World - Nations Online</div>
      </footer>
    </div>
  );
};

export default SearchResult;
