// import 'regenerator-runtime/runtime';
// import axios from "axios";

const state = {
  temperature: 1,
  upButton: null,
  downButton: null,
  tempDisplay: 10,
  city: null,
  headerCity: null,
  weatherGarden: null,
  skyDropDown: null,
  sky: null,
  defaultCity: null,
  realTimeTemp : null
};

const loadControls = () => {
  // retreive references to all of the html elements
  // we will need to access
  state.upButton = document.getElementById("up")
  state.downButton = document.getElementById("down")
  state.headerCity = document.getElementById("header-city")
  state.temperature = accessLocation();
  state.tempDisplay = document.getElementById("temperature-now");
  state.city = document.getElementById("city")
  state.weatherGarden = document.getElementById("weather-garden") 
  state.skyDropDown = document.getElementById("sky-drop-down")
  state.sky = document.getElementById("sky")
  state.defaultCity = document.getElementById("defaultCity")
  state.realTimeTemp = document.getElementById("real-time-temp")
};

const registerEvents = () => {
// reguster handlers for the button click
  
  state.upButton.addEventListener("click", (event) => {
      state.tempDisplay.innerText = ++state.temperature
      changeTemp();
  });
  state.downButton.addEventListener("click", (event) => {
      state.tempDisplay.innerText = --state.temperature
      changeTemp();
  });
  state.skyDropDown.addEventListener("change", (e) => {
      changeSky()
      console.log(state.skyDropDown.value)
  });
  state.defaultCity.addEventListener("click", (e) =>{
      state.headerCity.textContent = "Atlanta"
      accessLocation();
      changeTemp();
  })
  state.realTimeTemp.addEventListener("click", (e) =>{
      accessLocation();
      changeTemp();
  })
  state.city.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
          e.preventDefault();  // Prevent form submission
          console.log(state.city.value)
          let cityValue = state.city.value;
          state.headerCity.textContent = cityValue;
          accessLocation();

          // Clear the input field after updating the header
          //state.city.value = "";
      }
  })
};

const changeSky = () => {
  if (state.skyDropDown.value === "Sunny") {
      state.sky.textContent =  "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
  }else if(state.skyDropDown.value === "Cloudy"){
      state.sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
  }else if(state.skyDropDown.value === "Rainey"){
      state.sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
  }else if(state.skyDropDown.value === "Snowy"){
      state.sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
  }
}

const accessLocation = () => {
  axios.get(`http://127.0.0.1:5000/location?q=${state.headerCity.textContent}`).then(resp => {
  let lat = resp.data[0]["lat"]
  let lon = resp.data[0]["lon"]
  accessWeather(lat, lon);
  })
  .catch(error => console.log(error))
};

const accessWeather = (lat, lon) => {
  console.log(lat, lon)
  axios.get(`http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}&units=imperial`).then(resp => {
          console.log(resp.data["main"]["temp"])
          state.temperature = kelvinToFarenheit(resp.data["main"]["temp"])
          state.tempDisplay.innerText = state.temperature
          changeTemp();
          console.log(state.temperature)
      })
      .catch(error => console.log(error))
};
const kelvinToFarenheit = (temp) =>{
  return Math.round((temp-273.15)*(9/5)+32);
}
const changeTemp = () => {
  if (state.temperature >= 80) {
      state.tempDisplay.style.color = "rgb(252, 115 , 115)";
      state.weatherGarden.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
      document.body.style.backgroundColor = "rgb(255, 194 , 185)"
  } else if (state.temperature >= 70) {
      state.tempDisplay.style.color = "rgb(229, 114, 0)";
      state.weatherGarden.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
      document.body.style.backgroundColor = "rgb(252, 179 , 137)"
  } else if (state.temperature >= 60) {
      state.tempDisplay.style.color = "rgb(255, 217, 0)";
      state.weatherGarden.textContent = 	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
      document.body.style.backgroundColor = "rgb(255, 253, 179)"
  } else if (state.temperature >= 50) {
      state.tempDisplay.style.color = "green";
      state.weatherGarden.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
      document.body.style.backgroundColor = "rgb(204, 250, 192)"
  } else {
      state.tempDisplay.style.color = "teal";
      state.weatherGarden.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
      document.body.style.backgroundColor = "rgb(192, 246, 250)"
  }
};

const onLoaded = () => {
  // steps to carry out when the page is loaded
  loadControls();
  registerEvents();
  changeTemp();
};

onLoaded();