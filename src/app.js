
function displayDetails(response) {
   let h1 = document.querySelector("h1");
   let city = response.data.city;
   h1.innerHTML = `${city}`;

   let currentTemp = document.querySelector("#current-temperature");
   let cityTemp = response.data.temperature.current;
   currentTemp.innerHTML = `${Math.round(cityTemp)}`;
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
form.addEventListener("submit", searchCity)