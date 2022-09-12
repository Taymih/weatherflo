function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10){
        let hours = `0${hours}`;
    };
    let minutes = date.getMinutes();
    if (minutes < 10) {
      let minutes = `0${minutes}`;
    };
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
};

function displayFigures(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
    let skyElement = document.querySelector("#sky");
    let iconElement = document.querySelector("#icon");
    let cityName = document.querySelector("#city-name");
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt*1000);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
    skyElement.innerHTML = response.data.weather[0].description;
    cityName.innerHTML= response.data.name;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = response.data.main.temp;
};

function search(city) {
let apiKey = "628687b1313ed233e8a7594970069fef";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayFigures);
};

function fahrenheitFigure(event) {
    event.preventDefault();
    let fahrenheit = document.querySelector("#temperature");
    fahrenheit.innerHTML = Math.round((celsiusTemperature * 9 / 5) + 32);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
};

function celsiusFigure(event) {
    event.preventDefault();
    let celsius = document.querySelector("#temperature");
    celsius.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
};

search("Paris");
function queryInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter");
  search(cityInput.value);
};

celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitFigure);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusFigure);

let searchForm = document.querySelector("#search-panel");
searchForm.addEventListener("submit", queryInput);
