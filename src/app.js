
function displayDetails(response) {
   let h1 = document.querySelector("h1");
   let city = response.data.city;
   h1.innerHTML = `${city}`;

   let currentTemp = document.querySelector("#current-temperature");
   currentTemp.innerHTML = `${Math.round(response.data.temperature.current)}`;

   let currentHumidity = document.querySelector("#current-humidity");
   currentHumidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`

   let currentWind = document.querySelector("#current-wind");
   currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

   let weatherDescription = document.querySelector("#weather-description")
   weatherDescription.innerHTML = `${response.data.condition.description}`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  //weatherIcon.setAttribute("alt", response.data.condition.description);

  let date = new Date (response.data.time * 1000);
  let currentTime = document.querySelector("#current-time");
 currentTime.innerHTML = formatDate(date);

  getForecast(response.data.city);

}


function formatDate (date) {

 let minutes = date.getMinutes();
 let hours = date.getHours();
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days[date.getDay()];

 if (hours < 10) {
    hours = `0${hours}`
 }

 if (minutes < 10) {
    minutes = `0${minutes}`
 }
 
 return `${day} ~ ${hours}:${minutes} ~`

}

function cityDetails(city) {
    let apiKey = "f230a97a4f6f4577t418b7603o2e6fb5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayDetails)
}


function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#enter-a-city");
    cityDetails(cityInput.value);

}


function getForecast (city) {
    let apiKey = `f230a97a4f6f4577t418b7603o2e6fb5`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay (timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    

    if (date.getDay() == 6) {
        return (days[0]);
    } else return (days[date.getDay() + 1]);

}
function displayForecast(response) {

let forecastHtml = "";

response.data.daily.forEach(function (day, index) {
    if (index < 5) {                
   
forecastHtml = forecastHtml + `<div class=weather-forecast-day>
              <div class="weather-forecast-date">${formatForecastDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}"
              class= "weather-forecast-icon"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
              </div>
            </div>`
 }
})
let forecastElement = document.querySelector("#weather-forecast");
forecastElement.innerHTML = forecastHtml;

}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);

