
function displayDetails(response) {
    event.preventDefault();
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
    let cityInput = document.querySelector("#enter-a-city");
    cityDetails(cityInput.value);

}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);
