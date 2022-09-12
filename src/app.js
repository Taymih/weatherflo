function displayFigures(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
    let skyElement = document.querySelector("#sky");
    let iconElement = document.querySelector("#icon");
    let cityName = document.querySelector("#city-name");
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
};
function search(city) {
let apiKey = "628687b1313ed233e8a7594970069fef";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayFigures);
}
search("Paris");
function queryInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter");
  console.log(cityInput.value);
  search(cityInput.value);
}

let searchForm = document.querySelector("#search-panel");
searchForm.addEventListener("submit", queryInput);
