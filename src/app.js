let city = "New York";
let apiKey = "628687b1313ed233e8a7594970069fef";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayFigures);

function displayFigures(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML =response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let skyElement = document.querySelector("#sky");
    console.log(skyElement);
    skyElement.innerHTML = response.data.weather[0].description;
};

