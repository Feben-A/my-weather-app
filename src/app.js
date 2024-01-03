
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
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;


  let date = new Date (response.data.time * 1000);
  formatDate(date); }


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


 let currentTime = document.querySelector("#current-time");
 currentTime.innerHTML = `${day} ~ ${hours}:${minutes} ~`

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

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);

function displayForecast() {
let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
let forecastHtml = "";

days.forEach(function (day) {
forecastHtml = forecastHtml + `<div class=weather-forecast-day>
              <div class="weather-forecast-day">${day}</div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAe9JREFUaN7tmdmNwyAQhl1CSkgJlJAGVnIJLsElUAIluAR3sC7Br35LCe6AHVaTyEGAGa6AZKT/Iccw8zEHjtJJKbuW1XTwF0CVAJS1bRsDcU2sy7iSAGDgK0hatOYCiQaAwAZH4LqGqgAgoAch+JdYTQBrAMBSBQDWvQzUBHpq76nXAnQrBcAjAFzaQX0JAJEJ4KW+dYDdp5yCANTGWMcys0RyAKz9vUDw/42dDABPfS0U+FspAYoHnwwg48jMD4Cls38LwPBQOFABhkqC/7jJKQC8QoD3iG0ZQOneOsDYOgD3AWBNA+A9sDRbQhE/Heto4tpXFMDP73YDPahOwYaB7kQbo69gANiMgyTqRghiRxtBCN7qKwhAnd5hQ+mbBfjedLBZPG2cvkIBlsOGT58MKMdaIKMngNMXGQA26LVAes9A1oPN6mlz6osEgDX8tJWBOlXQDBoM7xvLABtaGPZy+goF4Fogd8tpzZbGVZocmWE+voIADM3EHac1Wxp3P9awITPszFcMwGxrJttpYXkYG9eVGZevVAC9Z2aYrXFPMjP7DgkKwIAbj5Qxh58Lrb6dI9XmK8ejRLGRmhzAd8wZ7MaQWzwHwMNnzJ3crFMXuWIzcDrmDHbC1LjFAQ5ZIAWBU4t1idb1T/0FcAF86g/VgX+0644VVAAAAABJRU5ErkJggg=="
              class= "weather-forecast-icon"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18°</span>
                <span class="weather-forecast-temperature-min">13°</span>
              </div>
              </div>
            </div>`

})
let forecastElement = document.querySelector("#weather-forecast");
forecastElement.innerHTML = forecastHtml;

}

displayForecast();