import React, { useEffect, useState } from 'react';

export default function Continents() {
  const [continents, setContinents] = useState([]);
  const [continentCountries, setContinentCountries] = useState({});
  const [selectedContinent, setSelectedContinent] = useState(null);

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Continents of the World</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => setSelectedContinent(continent)}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3498db',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {continent}
          </button>
        ))}
      </div>

      {selectedContinent && (
        <div>
          <h3>Countries in {selectedContinent}</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '15px'
            }}
          >
            {continentCountries[selectedContinent]?.map((country) => (
              <div
                key={country.cca3}
                style={{
                  backgroundColor: '#f1f1f1',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  style={{ width: '60px', height: 'auto', marginBottom: '5px' }}
                />
                <div>{country.name.common}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
