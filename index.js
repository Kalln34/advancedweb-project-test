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
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

    resultDiv.innerHTML = 'Loading...';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            `;
        })
        .catch(() => {
            resultDiv.innerHTML = 'City not found.';
        });
}