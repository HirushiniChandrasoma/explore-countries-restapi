import React, { useEffect, useState } from 'react';

export default function Languages() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const allLanguages = data.flatMap((country) =>
          country.languages ? Object.values(country.languages) : []
        );
        const uniqueLanguages = [...new Set(allLanguages)];
        setLanguages(uniqueLanguages);
      });
  }, []);

  return (
    <div>
      {languages.map((language) => (
        <div key={language}>
          <h3>{language}</h3>
          {/* Add logic to display countries speaking this language */}
        </div>
      ))}
    </div>
  );
}
