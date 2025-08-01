// REST Countries API
function getCountryInfo() {
    const country = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('countryResult');
    resultDiv.innerHTML = 'Loading...';

    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            const countryData = data[0];
            resultDiv.innerHTML = `
                <h3>${countryData.name.common}</h3>
                <img src="${countryData.flags.png}" alt="Flag" width="150">
                <p><strong>Capital:</strong> ${countryData.capital}</p>
                <p><strong>Region:</strong> ${countryData.region}</p>
                <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
                <p><strong>Languages:</strong> ${Object.values(countryData.languages).join(', ')}</p>
            `;
        })
        .catch(() => {
            resultDiv.innerHTML = 'Country not found.';
        });
}

// OpenWeatherMap API
function getWeatherInfo() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    const unit = document.getElementById('unitSelect').value;
    const apiKey = '9bffa1724249c6bb0a35f38003f5f95b'; // Replace with your OpenWeatherMap API key

    resultDiv.innerHTML = 'Loading...';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const tempUnit = unit === 'metric' ? '°C' : '°F';
            resultDiv.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p><strong>Temperature:</strong> ${data.main.temp} ${tempUnit}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            `;
        })
        .catch(() => {
            resultDiv.innerHTML = 'City not found.';
        });
}


async function getFlightData() {
  const accessKey = '746033c48ac2d471a75cd6d404f19df5';  
  const endpoint = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&limit=1`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      const flight = data.data[0];
      const output = `
        Flight: ${flight.flight.iata} (${flight.flight.number})
        Airline: ${flight.airline.name}
        Departure: ${flight.departure.airport} (${flight.departure.iata}) at ${flight.departure.scheduled}
        Arrival: ${flight.arrival.airport} (${flight.arrival.iata}) at ${flight.arrival.scheduled}
        Status: ${flight.flight_status}
            `;

      document.getElementById('output').textContent = output;
    } else {
      document.getElementById('output').textContent = "No flight data available.";
    }

  } catch (error) {
    console.error(error);
    document.getElementById('output').textContent = "Failed to fetch flight data.";
  }
}