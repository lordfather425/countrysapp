import React, { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Country Information</h1>
      </header>
      <main>
        <div className="container">
          {}
        </div>
        <div className="countries-list">
          {countries.map((country) => (
            <div
              key={country.name.common}
              className="country-card"
              data-country-name={country.name.common}
            >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="country-image"
              />
              <div className="country-info">
                <h2 className="country-name">{country.name.common}</h2>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
              {}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
