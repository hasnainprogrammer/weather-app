const searchBtn = document.querySelector(".search-btn");
const container = document.querySelector(".container");
const mainContainer = document.querySelector(".main");
const input = document.querySelector("input");
const weatherImg = document.querySelector(".weather-img");
const degree = document.querySelector(".degree");
const condition = document.querySelector(".condition");
const humidityDesc = document.querySelector(".humidity-desc");
const windDesc = document.querySelector(".wind-desc");
const apiKey = "YOUR API KEY";

const capitalize = function (str) {
  str = str.toLowerCase();
  str = str.split(" ");
  let output = "";
  str.forEach((word) => {
    output += word[0].toUpperCase() + word.slice(1) + " ";
  });
  return output;
};

searchBtn.addEventListener("click", function () {
  searchBtn.style.backgroundColor = "rgb(6, 18, 49)";
  searchBtn.style.color = "#fff";
  // FETCH DATA
  fetch(`/api/getWeather?city=${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        console.log("error 404");
        degree.style.display = "none";
        humidityDesc.style.display = "none";
        windDesc.style.display = "none";
        condition.textContent = "City Not Found!";
        weatherImg.src = "img/error-404.png";
        return;
      }
      const [weather] = data.weather;
      const { temp, humidity } = data.main;
      const { main, description } = weather;
      const { deg, speed } = data.wind;
      switch (main) {
        case "Clear":
          weatherImg.src = "img/sun.png";
          break;
        case "Clouds":
          weatherImg.src = "img/cloudy.png";
          break;
        case "Rain":
          weatherImg.src = "img/rainy-day.png";
          break;
        case "Thunderstorm":
          weatherImg.src = "img/storm.png";
          break;
        case "Haze":
          weatherImg.src = "img/haze.png";
          break;
        case "Snow":
          weatherImg.src = "img/snowy.png";
          break;
        default:
          weatherImg.src = "";
      }
      condition.textContent = capitalize(description);
      degree.textContent = `${parseInt(temp - 273.15)}°C`;
      humidityDesc.textContent = `${humidity}%`;
      windDesc.textContent = `${speed} Km/h`;
      condition.style.display = "block";
      degree.style.display = "block";
      humidityDesc.style.display = "block";
      windDesc.style.display = "block";
    })
    .catch((err) => console.log(err));
  // DISPLAY UI
  mainContainer.classList.add("show-container");
  container.classList.add("container-height");
});
