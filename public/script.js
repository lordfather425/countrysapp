
const countriesList = document.querySelector('.countries-list');
const darkModeToggle = document.getElementById('theme-switch');
const body = document.body;
const searchInput = document.getElementById('search');


let countriesData = [];


async function fetchCountries() {
  try {
    const response = await fetch('https:https://restcountries.com/v3.1/all')
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}


function renderCountries(countries) {
  countriesList.innerHTML = '';
  countries.forEach((country) => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');
    countryCard.dataset.countryName = country.name.common; 

    
    const countryNameElement = document.createElement('h3');
    countryNameElement.textContent = country.name.common;

    const populationElement = document.createElement('p');
    populationElement.textContent = `Population: ${country.population.toLocaleString()}`;

    const regionElement = document.createElement('p');
    regionElement.textContent = `Region: ${country.region}`;

    const capitalElement = document.createElement('p');
    capitalElement.textContent = `Capital: ${country.capital}`;

    
    countryCard.appendChild(countryNameElement);
    countryCard.appendChild(populationElement);
    countryCard.appendChild(regionElement);
    countryCard.appendChild(capitalElement);

    
    countryCard.addEventListener('mouseenter', () => {
      
      countryNameElement.textContent = `Country: ${country.name.common}`;
      populationElement.textContent = `Population: ${country.population.toLocaleString()}`;
      regionElement.textContent = `Region: ${country.region}`;
      capitalElement.textContent = `Capital: ${country.capital}`;
    });

    
    countryCard.addEventListener('mouseleave', () => {
      countryNameElement.textContent = country.name.common;
      populationElement.textContent = `Population: ${country.population.toLocaleString()}`;
      regionElement.textContent = `Region: ${country.region}`;
      capitalElement.textContent = `Capital: ${country.capital}`;
    });

    
    countriesList.appendChild(countryCard);
  });
}


function toggleDarkMode() {
  body.classList.toggle('dark-mode');

  
  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('dark-mode', isDarkModeEnabled);
}


darkModeToggle.addEventListener('change', toggleDarkMode);


const isDarkModePreferred = localStorage.getItem('dark-mode') === 'true';
if (isDarkModePreferred) {
  body.classList.add('dark-mode');
}


searchInput.addEventListener('input', searchCountries);


function searchCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const countryCards = document.querySelectorAll('.country-card');

  countryCards.forEach((countryCard) => {
    const countryName = countryCard.dataset.countryName.toLowerCase();
    if (countryName.includes(searchTerm)) {
      countryCard.style.display = 'block'; 
    } else {
      countryCard.style.display = 'none'; 
    }
  });
}


document.addEventListener('DOMContentLoaded', addHoverEffect);


fetchCountries()
  .then((data) => {
    countriesData = data; 
    renderCountries(data);
  })
  .catch((error) => console.error('Initial fetch error:', error));

regionSelect.addEventListener('change', filterByRegion);


function filterByRegion() {
  const selectedRegion = regionSelect.value.toLowerCase();
  const countryCards = document.querySelectorAll('.country-card');

  countryCards.forEach((countryCard) => {
    const countryRegion = countryCard.querySelector('.region').textContent.toLowerCase();

    if (selectedRegion === 'all' || countryRegion.includes(selectedRegion)) {
      countryCard.style.display = 'block'; 
    } else {
      countryCard.style.display = 'none'; 
    }
  });
}


filterByRegion();


