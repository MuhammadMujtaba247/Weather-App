/** Core features required:

Search by city name .
Display current temperature, feels like, humidity, wind speed, weather condition .
Weather icon matching the condition .
Toggle between Celsius and Fahrenheit ?
Error handling for invalid city names .


Features that make it portfolio worthy:

Recent searches saved to localStorage — last 5 cities
Clean responsive design — works on mobile
Background or color scheme changes based on weather condition — sunny looks different from rainy
Loading state while fetching .

**/
const API_key = process.env.WEATHER_API_KEY
let docElements = {
    pastSearchesDisplay: document.getElementById('past-searches'),
    pastSearches: JSON.parse(localStorage.getItem('Past Searches')),
    weatherLoader: document.createElement('div'),
    forecastsLoader: document.createElement('div'),
    currentWeatherDisplay: document.getElementById('current-weather-div'),
    inputDiv: document.getElementById('input-div'),
    searchButton: document.getElementById('search-button'),
    searchInput: document.getElementById('search-input'),
    forecastsContainer: document.getElementById('forecasts'),
    forecastDetailsTemplate: [
        'Date: ',
        'Temperature: ',
        'Humidity: ',
        'Weather Condition: ',
        'date',
        'temp',
        'humidity',
        'condition'],
    weatherDetailsTemplate: [
        'Date: ',
        "City Name: ",
        'Temperature: ',
        'Feels Like: ',
        "Humidity: ",
        "Wind Speed: ",
        "Weather Condition: ",
        'date',
        'name',
        'temp',
        'feels-like',
        'humidity',
        'windspeed',
        'condition'],
    warning: document.createElement('h5')
}
docElements.searchButton.addEventListener('click', loadCityInfo)
docElements.weatherLoader.setAttribute('class', 'spinner')
docElements.forecastsLoader.setAttribute('class', 'spinner')
docElements.warning.setAttribute('id', 'warning')
let weatherPromise, weatherResponse;


function updateWeather(currentWeather) {
    let currentWeatherDetails = [currentWeather.location.localtime.substring(0, 11),
    currentWeather.location.name + ', ' + currentWeather.location.country,
    currentWeather.current.temp_c + '℃',
    currentWeather.current.feelslike_c + '℃',
    currentWeather.current.humidity + "%",
    currentWeather.current.wind_kph + " km/h",
    currentWeather.current.condition.text
    ]
    for (i = 0; i < 7; i++) {
        docElements.currentWeatherDisplay.children[i].innerText += ` ${currentWeatherDetails[i]}`
    }
    let currentWeatherIcon = document.createElement('img')
    currentWeatherIcon.setAttribute('src', `${currentWeather.current.condition.icon}`)
    currentWeatherIcon.setAttribute('id', 'current-weather-icon')
    docElements.currentWeatherDisplay.appendChild(currentWeatherIcon)
}

function updateForecasts(currentForecasts) {
    let forecastCurrentDiv, currentForecast, forecastIcon, currentForecastDetails;
    for (i = 0; i < 4; i++) {
        currentForecast = currentForecasts.forecastday[i + 1]
        currentForecastDetails = [currentForecast.date,
        currentForecast.day.avgtemp_c + '℃',
        currentForecast.day.avghumidity + "%",
        currentForecast.day.condition.text,
        ]
        forecastCurrentDiv = docElements.forecastsContainer.children[i]
        for (j = 0; j < 4; j++) {
            forecastCurrentDiv.children[j].innerText += ` ${currentForecastDetails[j]}`
        }
        forecastIcon = document.createElement('img')
        forecastIcon.setAttribute('src', `${currentForecast.day.condition.icon}`)
        forecastIcon.setAttribute('class', 'current-forecast-icon')
        forecastCurrentDiv.appendChild(forecastIcon)
    }
}

function loadWeatherDisplay() {
    docElements.currentWeatherDisplay.innerHTML = ''
    let newCurrentElement;
    for (i = 0; i < (docElements.weatherDetailsTemplate.length - 7); i++) {
        newCurrentElement = document.createElement('h4')
        newCurrentElement.setAttribute('id', `current-${docElements.weatherDetailsTemplate[i + 7]}`)
        newCurrentElement.innerText = docElements.weatherDetailsTemplate[i]
        docElements.currentWeatherDisplay.appendChild(newCurrentElement)
    }
}

function loadForecastDisplay() {
    docElements.forecastsContainer.innerHTML = ''
    for (i = 0; i < 4; i++) {
        let forecastDiv = document.createElement('div')
        forecastDiv.setAttribute('id', `forecast${i}`)
        forecastDiv.setAttribute('class', 'forecast-div')
        docElements.forecastsContainer.appendChild(forecastDiv)
        let newElement;
        for (j = 0; j < (docElements.forecastDetailsTemplate.length - 4); j++) {
            newElement = document.createElement('h5')
            newElement.setAttribute('id', `forecast-${i}-${docElements.forecastDetailsTemplate[j + 4]}`)
            newElement.style.margin = '0.5rem'
            newElement.innerText = docElements.forecastDetailsTemplate[j]
            forecastDiv.appendChild(newElement)
        }
    }
}

async function loadScreen(city) {
    try {
        docElements.currentWeatherDisplay.innerHTML = ''
        docElements.forecastsContainer.innerHTML = ''
        docElements.currentWeatherDisplay.appendChild(docElements.weatherLoader)
        docElements.forecastsContainer.appendChild(docElements.forecastsLoader)
        weatherPromise = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_key}=${city}&days=5&aqi=no&alerts=no`)
        if (!weatherPromise.ok) {
            console.log(weatherPromise.status)
            throw weatherPromise
        } else {
            weatherResponse = await weatherPromise.json()
            if (docElements.pastSearches.includes(city)) {
                i = docElements.pastSearches.indexOf(city)
                docElements.pastSearches.splice(i, 1)
            }
            docElements.pastSearches.unshift(city)
            if (docElements.pastSearches.length > 5) {
                docElements.pastSearches = docElements.pastSearches.slice(0, 5)
            }
            console.log(docElements.pastSearches)
            docElements.pastSearchesDisplay.innerHTML = ''
            for (i = 0; i < docElements.pastSearches.length; i++) {
                let pastSearch = document.createElement('option')
                pastSearch.setAttribute('value', docElements.pastSearches[i])
                docElements.pastSearchesDisplay.appendChild(pastSearch)
            }
            localStorage.setItem('Past Searches', JSON.stringify(docElements.pastSearches))
        }
        console.log(city + ": ")
        console.log(weatherResponse)
        docElements.weather = weatherResponse
        loadWeatherDisplay()
        loadForecastDisplay()
        updateWeather(docElements.weather)
        updateForecasts(docElements.weather.forecast)

    } catch (error) {
        console.log(error)
        docElements.warning.innerText = 'Please enter a valid city name.'
        docElements.inputDiv.appendChild(docElements.warning)
    }
}
loadScreen('Karachi')

function loadCityInfo() {
    if (docElements.inputDiv.contains(docElements.warning)) {
        docElements.inputDiv.removeChild(docElements.warning)
    }
    cityName = docElements.searchInput.value
    if (cityName === '') {
        docElements.warning.innerText = 'Please enter a city name.'
        docElements.inputDiv.appendChild(docElements.warning)
    } else {
        docElements.searchInput.value = ''
        loadScreen(cityName)

    }
}


