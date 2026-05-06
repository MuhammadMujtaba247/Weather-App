# Weather App ☁️

A live weather application that shows current conditions and a multi-day forecast for any city. Built as a portfolio project to demonstrate API integration, asynchronous JavaScript, and localStorage.

🔴 **Live demo:** [weather-app-delta-three-31.vercel.app](https://weather-app-delta-three-31.vercel.app)

---

## Features

- **Search by city** — get current weather for any location
- **Current conditions** — temperature, feels like, humidity, wind speed, and weather description
- **Weather icons** — dynamic icons matching the conditions
- **Recent searches** — last 5 cities saved using localStorage
- **Error handling** — user-friendly message for invalid city names
- **Loading state** — spinner shown while fetching data

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling, responsive layout |
| JavaScript (ES6+) | API calls, DOM manipulation, localStorage |
| WeatherAPI | Live weather and forecast data |

---

## What I Learned

- Working with external APIs and handling async/await
- Managing state with localStorage for recent searches
- Building a responsive layout that works on mobile and desktop
- Error handling for network requests and invalid user input
- Dynamic DOM creation based on API responses

---

## Future Improvements

- Toggle between Celsius and Fahrenheit
- Weather-based background colors (sunny, rainy, etc.)
- "Use my location" button with geolocation

---

## How to Run Locally

1. Clone the repository
2. Open `index.html` in your browser
3. No build step needed — it's vanilla JS

---

## Acknowledgements

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
