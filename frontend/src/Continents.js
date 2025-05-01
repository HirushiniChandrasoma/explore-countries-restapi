import React, { useEffect, useState, useCallback } from 'react';
import australia from '../src/images/australia.png';
import europe from '../src/images/europe.png';
import asia from '../src/images/asia.png';
import antarctica from '../src/images/antactica.png';
import africa from '../src/images/africa.png';
import northamerica from '../src/images/northamerica.png';
import southamerica from '../src/images/southamerica.png';
import bg from '../src/images/bg.jpg';

export default function Continents() {
  const [continents, setContinents] = useState([]);
  const [continentCountries, setContinentCountries] = useState({});
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [currentCountries, setCurrentCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCountriesLoaded, setAllCountriesLoaded] = useState(false);

  const countriesPerScroll = 10; // Number of countries to load per scroll

  // Define the mapping of continent names to their images
  const continentImages = {
    Oceania: australia,
    Europe: europe,
    Asia: asia,
    Antarctica: antarctica,
    Africa: africa,
    'North America': northamerica,
    'South America': southamerica,
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const allContinents = data.flatMap((country) => country.continents || []);
        const uniqueContinents = [...new Set(allContinents)];
        setContinents(uniqueContinents);

        const grouped = {};
        uniqueContinents.forEach((cont) => {
          grouped[cont] = data.filter((country) =>
            (country.continents || []).includes(cont)
          );
        });
        setContinentCountries(grouped);
      });
  }, []);

  // Load countries when a continent is selected
  const loadCountries = useCallback((continent) => {
    if (continentCountries[continent]) {
      setCurrentCountries(continentCountries[continent].slice(0, countriesPerScroll));
      setAllCountriesLoaded(false); // Reset loading flag when a new continent is selected
    }
  }, [continentCountries]);

  // Detect when the user has scrolled to the bottom
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && !allCountriesLoaded) {
      setLoading(true);
      loadMoreCountries();
    }
  };

  // Load more countries
  const loadMoreCountries = () => {
    const continent = selectedContinent;
    if (continent && continentCountries[continent]) {
      const currentLength = currentCountries.length;
      const newCountries = continentCountries[continent].slice(currentLength, currentLength + countriesPerScroll);

      if (newCountries.length === 0) {
        setAllCountriesLoaded(true); // No more countries to load
      } else {
        setCurrentCountries((prevCountries) => [...prevCountries, ...newCountries]);
      }

      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto relative">
      <style>
        {`
          body {
            background-image: url(${bg}); /* Updated the background image */
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            height: 100vh;
            margin: 0;
          }
          .background-blur {
            position: absolute;
            inset: 0;
            background-image: url(${bg});
            background-size: cover;
            background-position: center;
            filter: blur(8px);
            z-index: -1;
          }
        `}
      </style>

      <div className="background-blur"></div>

      <div className="relative z-10 mb-8">
        <div className="relative z-20 text-center p-6">
          <h2 className="text-5xl font-semibold mb-5 text-white shadow-lg shadow-black p-3 inline-block bg-opacity-50 bg-black rounded-md">
            Continents of the World
          </h2>
        </div>
      </div>

      {/* Continent List Section */}
      <div className="relative z-10">
        <div className="flex flex-col gap-6 mb-5 items-start">
          {continents.map((continent) => (
            <div
              key={continent}
              className="w-full bg-white p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              onClick={() => {
                // Toggle the selected continent
                if (selectedContinent === continent) {
                  setSelectedContinent(null); // Hide the countries if the same continent is clicked
                } else {
                  setSelectedContinent(continent); // Show the countries for the selected continent
                  loadCountries(continent); // Load the countries for the selected continent
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">{continent}</div>
                {/* Use the continent-specific image */}
                <img
                  src={continentImages[continent]} // Display the specific continent image
                  alt={continent}
                  className="w-17 h-17 object-cover rounded-full"
                />
              </div>

              {/* Show Countries in Selected Continent */}
              {selectedContinent === continent && (
                <div
                  className="overflow-y-auto max-h-[500px]" // You can adjust the max-height to fit your needs
                  onScroll={handleScroll}
                >
                  <h3 className="text-3xl text-center mb-4 text-white">Countries in {continent}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentCountries.map((country) => (
                      <div
                        key={country.cca3}
                        className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-md"
                      >
                        <img
                          src={country.flags.png}
                          alt={country.name.common}
                          className="w-24 h-16 object-contain mx-auto mb-4" // Adjust image size as needed
                        />
                        <div>{country.name.common}</div>
                      </div>
                    ))}
                  </div>

                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex justify-center mt-4">
                      <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-8 h-8"></div>
                    </div>
                  )}

                  {/* Message when all countries have been loaded */}
                  {allCountriesLoaded && (
                    <div className="text-center text-white mt-4">No more countries to load.</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
