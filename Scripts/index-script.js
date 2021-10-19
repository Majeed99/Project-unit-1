// fetch("api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}");
// 8618b3d831e9d657b3baac2facdfe14d
// API KEY OF WEATHER
let allCities = ["riyadh", "dammam"];
localStorage.setItem("allCities", JSON.stringify(allCities));
fetchWeather();
function fetchWeather() {
  let allCities = JSON.parse(localStorage.getItem("allCities"));
  // console.log(allCities);
  let i = 0;
  document.getElementById("slider").innerHTML = "";
  document.getElementById("allweathers").innerHTML = "";
  allCities.forEach((cityName) => {
    // console.log(cityName);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=8618b3d831e9d657b3baac2facdfe14d",
      {
        method: "GET",
      }
    )
      .then((response) => {
        // console.log("resolve", response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(i);
        if (i == 0) {
          i++;
          display(data, "active");
        } else {
          display(data, "");
        }
      })
      .catch((err) => {
        console.log("rejected", err);
      });
  });
}
function display(data, active) {
  let dt = new Date();
  // console.log(dt.toDateString());
  let info = document.getElementById("info");
  let slider = document.getElementById("slider");
  let allweathers = document.getElementById("allweathers");
  let city = data.name;
  let country = data.sys.country;
  let status = data.weather[0].main;
  let temp = data.main.temp;
  let tempMin = data.main.temp_min;
  let tempMax = data.main.temp_max;
  let seaLevel = data.main.sea_level;
  let humidity = data.main.humidity;
  let pressure = data.main.pressure;
  let speed = data.wind.speed;
  // console.log(active);
  allweathers.innerHTML += `
  <div class="cardWeather">
  <button class="deleteBtn" name=${city}> ✖ </button>
  <h1 class="city">
       ${city} ,${country}
     </h1>
     <h6 class="date"> ${dt.toDateString()}</h6>
     <h1 class="temp"> 
       ${parseInt(temp - 273.15)}
       <img src="../images/thermometer.png" width="20%" alt=""> 
      
      </h1>
     <p class="separator">-----------------</p>
     <p class="status">${status}</p>
     <p class="min-max"> ${parseInt(tempMin - 273.15)}°c / ${parseInt(
    tempMax - 273.15
  )}°c</p>

     <div class="d-flex justify-content-around details">
       <div class="col-4 d-block"> 
        <img src="../images/pressure.png" width="40%" alt="">
        <p><b>pressure</b></p> 
        <p class="details"> ${pressure} hPa</p>
           
      </div>
       <div class="col-4 d-block"> 
        <img src="../images/humidity.png" width="40%" alt="">
        <p><b>humidity</b></p>
        <p class="details"> ${humidity} %</p>
        
      </div>
       
       <div class="col-4 d-block">
        <img src="../images/wind.png" width="40%" alt="">
        <p><b>speed</b></p>
        <p class="details"> ${speed} m/s</p>
       </div>`;
  slider.innerHTML += `
          <div class="carousel-item ${active}">
          <button class="deleteBtn" name=${city} > ✖ </button>
   <h1 class="city">
       ${city} ,${country}
     </h1>
     <h6 class="date"> ${dt.toDateString()}</h6>
     <h1 class="temp"> 
       ${parseInt(temp - 273.15)}
       <img src="../images/thermometer.png" width="20%" alt=""> 
      
      </h1>
     <p class="separator">-----------------</p>
     <p class="status">${status}</p>
     <p class="min-max"> ${parseInt(tempMin - 273.15)}°c / ${parseInt(
    tempMax - 273.15
  )}°c</p>

     <div class="d-flex justify-content-around details">
       <div class="col-4 d-block"> 
        <img src="../images/pressure.png" width="40%" alt="">
        <p><b>pressure</b></p> 
        <p class="details"> ${pressure} hPa</p>
           
      </div>
       <div class="col-4 d-block"> 
        <img src="../images/humidity.png" width="40%" alt="">
        <p><b>humidity</b></p>
        <p class="details"> ${humidity} %</p>
        
      </div>
       
       <div class="col-4 d-block">
        <img src="../images/wind.png" width="40%" alt="">
        <p><b>speed</b></p>
        <p class="details"> ${speed} m/s</p>
       </div>
       </div>
       
  `;
  let deleteBtns = document.getElementsByClassName("deleteBtn");
  // console.log(deleteBtns);
  for (let i = 0; i < deleteBtns.length; i++) {
    // console.log(deleteBtns[i]);
    deleteBtns[i].addEventListener("click", function () {
      console.log(deleteBtns[i].name);
      let allCities = JSON.parse(localStorage.getItem("allCities"));
      let index = allCities.indexOf(deleteBtns[i].name.toLowerCase());
      allCities.splice(index, 1);
      console.log(allCities);
      localStorage.clear();
      localStorage.setItem("allCities", JSON.stringify(allCities));
      fetchWeather();
    });
  }
}
function darkMode() {
  // console.log(document.getElementById("info").style.color == "white");
  if (document.getElementById("info").style.color == "black") {
    document.body.style =
      "background-image: linear-gradient(rgb(62 64 126), rgb(11 5 30));";
    document.getElementById("info").style = "color:white;";
    document.getElementById("togglerNav").style =
      "background-color: #ffffff5c; ";
    document.getElementById("brandNav").style = " color:white;";
    document.getElementById("navItem").style = " color:white;";
    document.getElementById("footer").style =
      "background-image: linear-gradient(rgba(128, 128, 128, 0),rgba(255, 255, 255, 0.205));color: wheat;";
  } else {
    document.body.style =
      "background-image: linear-gradient(rgb(247, 247, 247), rgb(187, 204, 223)); ";
    document.getElementById("info").style = "color:black;";
    document.getElementById("togglerNav").style = "background-color: none ";
    document.getElementById("brandNav").style = " color:black;";
    document.getElementById("navItem").style = " color:black;";
    document.getElementById("footer").style =
      "background-image: linear-gradient(rgba(128, 128, 128, 0),rgba(0, 0, 0, 0.205));color: rgb(0, 0, 0);";
  }
}
function add() {
  let searchInput = document.getElementById("searchInput").value;
  // console.log(searchInput);
  let allCities = JSON.parse(localStorage.getItem("allCities"));
  if (allCities.indexOf(searchInput.toLowerCase()) != -1) {
    alert("it's already added before");
    return;
  }
  allCities.unshift(searchInput.toLowerCase());
  localStorage.setItem("allCities", JSON.stringify(allCities));
  fetchWeather();
}
