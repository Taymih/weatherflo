function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
     minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayFigures(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let skyElement = document.querySelector("#sky");
  let iconElement = document.querySelector("#icon");
  let cityName = document.querySelector("#city-name");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  skyElement.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  checkForecast(response.data.coord);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  checkForecast(response.data.coord);
};

function checkForecast(coordinates) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`; 
  axios.get(apiUrl).then(displayForecast);
};

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastData, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                    <div class="col-2">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastData.dt)}
                        </div>
                        <img src="http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png" 
                        alt="#" 
                        width="42"
                        />
                        <div class="weather-temperatures">
                            <span class="weather-forecast-temperatures-max">${Math.round(forecastData.temp.max)}</span>
                            <span class="weather-forecast-temperatures-min">${Math.round(forecastData.temp.min)}</span>
                        </div>
                    </div>
                    `;
    };
  });
  forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
};
  
function search(city) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFigures);
}

search("Paris");
function queryInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter");
  search(cityInput.value);
}

function fahrenheitFigure(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function celsiusFigure(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function searchLocation(position) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFigures);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitFigure);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusFigure);

let searchForm = document.querySelector("#search-panel");
searchForm.addEventListener("submit", queryInput);

let currentPosition = document.querySelector("button");
currentPosition.addEventListener("click", getPosition);

