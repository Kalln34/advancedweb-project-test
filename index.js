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


async function getExchangeRate() {
  const apiKey = 'fB24q5dX3zarjunpKiQ9wyieziFQuK';
  const from = document.getElementById('fromCurrency').value.trim().toUpperCase();
  const to = document.getElementById('toCurrency').value.trim().toUpperCase();

  if (!from || !to) {
    document.getElementById('output').textContent = 'Please enter each currency codes.';
    return;
  }

  const url = `https://www.amdoren.com/api/currency.php?api_key=${apiKey}&from=${from}&to=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      document.getElementById('output').textContent = `Error: ${data.error}`;
    } else {
      document.getElementById('output').textContent = `
Exchange Rate:
1 ${from} = ${data.amount} ${to}
      `;
    }
  } catch (err) {
    console.error(err);
    document.getElementById('output').textContent = 'Error fetching exchange rate.';
  }
}