let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
api_key = WEATHER_API_KEY,
currentWeatherCard = document.querySelectorAll('.weather-left .card2')[0],
fiveDaysForecastCard = document.querySelector('.day-forecast'),
aqiCard = document.querySelectorAll('.highlights .card')[0],
sunriseCard = document.querySelectorAll('.highlights .card')[1],
humidityVal = document.getElementById('humidityVal'),
pressureVal = document.getElementById('pressureVal'),
visibilityVal = document.getElementById('visibilityVal'),
windSpeedVal = document.getElementById('windSpeedVal'),
feelsVal = document.getElementById('feelsVal'),
hourlyForecastCard = document.querySelector('.hourly-forecast'),
aqiList = ['Good','Fair', 'Moderate','Poor','Very Poor'];


function getWeatherDetails(name, lat, lon, country, state){
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
  WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
  AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
    let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
    aqiCard.innerHTML = `
    <div class="col-md-12">
       <div class="card  rounded p-3" style="min-height: 200px;">
        <div class="card-body">
            <h6 class="card-title">Air Quality Index</h6>
            <div class="d-flex justify-content-between align-items-center">
              <i class="fa-regular fa-wind fa-3x"></i>
                <span class="badge bg-danger px-3 py-1 air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</span>
            </div>
            <div class="row text-center mt-3">
                <div class="col-3">
                    <h6>PM2.5</h6>
                    <h4>${pm2_5}</h4>
                </div>
                <div class="col-3">
                    <h6>PM10</h6>
                    <h4>${pm10}</h4>
                </div>
                <div class="col-3">
                    <h6>NH3</h6>
                    <h4>${nh3}</h4>
                </div>
                <div class="col-3">
                    <h6>SO2</h6>
                    <h4>${so2}</h4>
                </div>
            </div>
            <div class="row text-center mt-3">
                <div class="col-3">
                    <h6>CO</h6>
                    <h4>${co}</h4>
                </div>
                <div class="col-3">
                    <h6>NO</h6>
                    <h4>${no}</h4>
                </div>
                <div class="col-3">
                    <h6>NO2</h6>
                    <h4>${no2}</h4>
                </div>
                <div class="col-3">
                    <h6>O3</h6>
                    <h4>${o3}</h4>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
  }).catch(() =>{
    alert('Failed to fetch air pollution')
  });

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
    let date = new Date();
    currentWeatherCard.innerHTML = `
    <div class="card mb-3 mt-3 w-100 ">
      <div class="row g-0">
      <div class="col-md-3 d-flex align-items-center justify-content-center">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="img-fluid rounded-start" 
             style="max-height: 100px; object-fit: contain;" alt="Weather Icon">
      </div>

      <!-- Middle Section: Additional Text -->
      <div class="col-md-3 d-flex align-items-center justify-content-center">
        <div class="card-body">
          <h1 class="card-text">${(data.main.temp - 273.15).toFixed(2)}&deg;C</h1>
          <p class="card-text">${data.weather[0].description}</p>
          </div>
      </div>

      <!-- Right Side: Weather Details -->
       
          <div class="col-md-6 d-flex align-items-center justify-content-end">
            <div class="card-body text-end">
              <h4 class="card-title">Now</h4>
              <p class="card-text">${(data.main.temp - 273.15).toFixed(2)}&deg;C</p>
              <p><i class="fa-light fa-calendar"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
             <p><i class="fa-light fa-location-dot"></i>${name},${country}</p>
            </div>
          </div>
            </div>
          </div>
    `;

    let {sunrise,sunset} = data.sys,
    {timezone, visibility} = data,
    {humidity, pressure, feels_like} = data.main,
    {speed} = data.wind,
    sRiseTime = moment.utc(sunrise,'X').add(timezone, 'seconds').format('hh:mm A'),
    sSetTime = moment.utc(sunset,'X').add(timezone, 'seconds').format('hh:mm A');
    sunriseCard.innerHTML = `
      <div class="card  rounded p-3" style="height: 100%;">
        <div class="card-body text-center">
            <h6 class="card-title">Sunrise & Sunset</h6>
            <div class="row mt-3">
                <div class="col-6">
                    <h6>Sunrise</h6>
                    <i class="fa-light fa-sunrise fa-4x"></i>
                    <h4 class="mt-3">${sRiseTime}</h4>
                </div>
                <div class="col-6">
                    <h6>Sunset</h6>
                    <i class="fa-light fa-sunset fa-4x"></i>
                    <h4 class="mt-3">${sSetTime}</h4>
                </div>
            </div>
        </div>
    </div>
    `;

    humidityVal.innerHTML = `${humidity} %`;
    pressureVal.innerHTML = `${pressure} hPa`;
    visibilityVal.innerHTML = `${visibility / 1000} km`;
    windSpeedVal.innerHTML = `${speed} m/s`;
    feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;

  }).catch(() =>{
    alert('Failed to fetch current weather');
  });
  fetch(FORECAST_API_URL).then(res => res.json()).then(data =>{
    let hourlyForecast = data.list;
    hourlyForecastCard.innerHTML = '';
    
    let rowDiv; // Variable to store the row container
    
    for (let i = 0; i <= 7; i++) {
      if (i % 4 === 0) { 
        // Create a new row every 4 cards
        rowDiv = document.createElement('div');
        rowDiv.className = 'row row-cols-1 row-cols-md-4 g-4 mb-3';
        hourlyForecastCard.appendChild(rowDiv); // Append new row to container
      }

      let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
      let hr = hrForecastDate.getHours();
      let a = 'PM';
      if (hr < 12) a = 'AM';
      if (hr == 0) hr = 12;
      if (hr > 12) hr = hr - 12;

      let colDiv = document.createElement('div'); // Create a column for the card
      colDiv.className = 'col';
      colDiv.innerHTML = `
        <div class="card text-center">
          <div class="card-body d-flex flex-column align-items-center justify-content-center">
            <h5 class="card-title">${hr} ${a}</h5>
            <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
            <span>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
          </div>
        </div>
      `;

      rowDiv.appendChild(colDiv); // Append card to the current row
    }
    let uniqueForecastDays = [];
    let fiveDaysForecast = data.list.filter(forecast =>{
      let forecastDate = new Date(forecast.dt_txt).getDate();
      if(!uniqueForecastDays.includes(forecastDate)){
        return uniqueForecastDays.push(forecastDate);
      }
    });
    fiveDaysForecastCard.innerHTML = '';
    for(i=1;i < fiveDaysForecast.length;i++){
      let date = new Date(fiveDaysForecast[i].dt_txt);
      fiveDaysForecastCard.innerHTML += `
      <div class="container-fluid mt-4 mb-4">
      <div class="card p-4 " style="border-radius: 10px;">
      <div class="row mt-3">
        <div class="col d-flex align-items-center">
          <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" class="me-2" width="30">
          <span class="fw-bold">${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
        </div>
        <div class="col text-center">${date.getDate()} ${months[date.getMonth()]}</div>
        <div class="col text-end">${days[date.getDay()]}</div>
      </div>
      </hr>
      `;
    }
  }).catch(() =>{
    alert('Failed to fetch  weather forecast')
  });
  
}

function getCityCoordinates(){
  let cityName = cityInput.value.trim();
  cityInput.value = '';
  if(!cityName) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
    let {name, lat, lon, country, state} = data[0];
    getWeatherDetails(name, lat, lon, country, state);
  }).catch(() => {
    alert(`Failed to fetch coordinates of ${cityName}`);
  })
}

function getUserCoordinates(){
  navigator.geolocation.getCurrentPosition(position => {
    let {latitude, longitude} = position.coords;
    let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

    fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data =>{
      let {name, country, state} = data[0];
      getWeatherDetails(name,latitude,longitude,country,state);
    }).catch(() =>{
      alert('Failed to fetch user coordinates')
    });
  }, error => {
    if(error.code === error.PERMISSION_DENIED){
      alert('Geolocation permission denied. Enable your location')
    }
  })
}



searchBtn.addEventListener('click',getCityCoordinates);
locationBtn.addEventListener('click',getUserCoordinates);
cityInput.addEventListener('keyup',e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load',getUserCoordinates);
