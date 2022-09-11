let city = "New York";
let apiKey = "628687b1313ed233e8a7594970069fef";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayFigures);

function displayFigures(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity"); 
    let windElement = document.querySelector("#wind");
    let skyElement = document.querySelector("#sky");
    let cityName = document.querySelector("#city-name");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    skyElement.innerHTML = response.data.weather[0].description;
    cityName.innerHTML = city;
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute(
      "alt",
      response.data.weather[0].description,
    );
};

