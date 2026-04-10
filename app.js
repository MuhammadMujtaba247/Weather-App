/** Core features required:

Search by city name
Display current temperature, feels like, humidity, wind speed, weather condition
Weather icon matching the condition
Toggle between Celsius and Fahrenheit
Error handling for invalid city names
Features that make it portfolio worthy:

Recent searches saved to localStorage — last 5 cities
Clean responsive design — works on mobile
Background or color scheme changes based on weather condition — sunny looks different from rainy
Loading state while fetching

**/
let docElements = {
    searchButton: document.getElementById('search-button'),
    currentLocationButton: document.getElementById('currentlocation-button'),
    currentName: document.getElementById('current-name'),
    currentTemp: document.getElementById('current-temp'),
    currentFeelsLike: document.getElementById('current-feels-like'),
    currentHumidity: document.getElementById('current-humidity'),
    currentWindSpeed: document.getElementById('current-windspeed'),
    currentIcon: document.getElementById('current-weather-icon'),
    currentCondition: document.getElementById('current-weather-condition'),
    forecastsContainer: document.getElementById('forecasts')
}

async function loadDefault() {
    try {
        let defaultWeatherPromise = await fetch('http://api.weatherapi.com/v1/forecast.json?key=344c9a24f7a546608ee164936260904&q=Karachi&days=4&aqi=no&alerts=no')
        docElements.defaultWeather = await defaultWeatherPromise.json()
        console.log(docElements.defaultWeather)
        docElements.currentName.innerText += ` ${docElements.defaultWeather.location.name}, ${docElements.defaultWeather.location.country}`
        docElements.currentTemp.innerText += ` ${docElements.defaultWeather.current.temp_c}℃`
        docElements.currentFeelsLike.innerText += ` ${docElements.defaultWeather.current.feelslike_c}℃`
        docElements.currentHumidity.innerText += ` ${docElements.defaultWeather.current.humidity}%`
        docElements.currentWindSpeed.innerText += ` ${docElements.defaultWeather.current.wind_kph} km/h`
        docElements.currentIcon.setAttribute('src', `${docElements.defaultWeather.current.condition.icon}`)
        docElements.currentCondition.innerText += ` ${docElements.defaultWeather.current.condition.text}`
        
    } catch (error) {
        console.log(error)
    }
}
loadDefault()

for (i = 0; i < 4; i++) {
    let forecastDiv = document.createElement('div')
    forecastDiv.setAttribute('id', `forecast${i}`)
    docElements.forecastsContainer.appendChild(forecastDiv)
}



