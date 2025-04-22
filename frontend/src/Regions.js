import React, { useEffect, useState } from 'react';

export default function Regions() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const uniqueRegions = [...new Set(data.map((country) => country.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  return (
    <div>
      {regions.map((region) => (
        <div key={region}>
          <h3>{region}</h3>
          {/* Add logic to display countries in this region */}
        </div>
      ))}
    </div>
  );
}
