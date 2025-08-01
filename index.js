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
  const airlineName = document.getElementById('airlineInput').value.trim().toLowerCase();

  if (!airlineName) {
    document.getElementById('output').textContent = 'Please enter an airline name.';
    return;
  }

  const endpoint = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&limit=100`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      document.getElementById('output').textContent = "No flight data found.";
      return;
    }

    const matchingFlights = data.data.filter(flight => 
      flight.airline.name && flight.airline.name.toLowerCase().includes(airlineName)
    );

    if (matchingFlights.length === 0) {
      document.getElementById('output').textContent = "No matching flights found for that airline.";
      return;
    }

    const results = matchingFlights.map(flight => {
      return `
        Flight: ${flight.flight.iata || 'N/A'} (${flight.flight.number || 'N/A'})
        Airline: ${flight.airline.name || 'N/A'}
        Departure: ${flight.departure.airport || 'N/A'} (${flight.departure.iata || ''}) at ${flight.departure.scheduled || 'N/A'}
        Arrival: ${flight.arrival.airport || 'N/A'} (${flight.arrival.iata || ''}) at ${flight.arrival.scheduled || 'N/A'}
        Status: ${flight.flight_status || 'N/A'}
        ---`;
            }).join('\n');

    document.getElementById('output').textContent = results;

  } catch (error) {
    console.error(error);
    document.getElementById('output').textContent = "Error fetching flight data.";
  }
}