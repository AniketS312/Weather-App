// Get Elements
const degree = document.getElementById('degree');
const city = document.getElementById('city');
const time = document.getElementById('time');
const icon = document.getElementById('icon-info');
const hour = document.getElementById('hour')
const day = document.getElementById('day')
const leftArea = document.getElementById('temp');
const hidden = document.getElementById('loading')
const input = document.getElementById('input-search')
const inputButton = document.getElementById('input-button')
const link = document.querySelectorAll('#link')
const image = document.getElementById('icon-img')

///////////////// Get Geolocation and inital lookup
// //Get key from config
let key = apiKeys.weatherKey;

function intialLookup(pos) {
// Get Longitude and Latitude
let crd = pos.coords
let latitude = crd.latitude;
let longitude = crd.longitude;
// console.log(latitude,longitude)
// Fetch Api
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
.then(function(response) {
    let data  = response.json();
    return data;
})
.then(function(data) {
  console.log(data)
  let cityName = data.name;
// update content for intial load
  city.innerText = data.name;
  toggleHidden();
  const temprature = data.main.temp - 273.15;
  degree.innerText = Math.round(temprature) + '°';
  let time = (new Date() + data.timezone).split(' ');
  hour.textContent = getHour(time[4])
  day.textContent = getDay(time[0])
  getIcon(data)
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityName + "')"
  getWeatherInfo(data);
})
}

function error(err) {
  alert("Sorry. But something went wrong while trying to find you location.")
}

// Remove and add Hidden 

function toggleHidden() {
  hidden.classList.add('hidden');
  leftArea.classList.remove('hidden');
}

function errtoggleHidden() {
  hidden.classList.remove('hidden');
  leftArea.classList.add('hidden');
  hidden.textContent = "Sorry! Could not find city";
}


navigator.geolocation.getCurrentPosition(intialLookup, error);

// Convert Date to extract day
function getDay(input) {
  if (input == 'Mon') {
  return 'Monday';
} else if (input == 'Tue') {
  return 'Tuesday';
} else if (input == 'Wed') {
  return 'Wednesday';
} else if (input == 'Thu') {
  return 'Thursday';
} else if (input == 'Fri') {
  return 'Friday';
} else if (input == 'Sat') {
  return 'Saturday';
} else {
  return 'Sunday'
}
}

function getlocalTime(input) {
  // Initalize
  let d = new Date((new Date().getTime())+input.timezone*1000)
  let time = d.toISOString();
  let result = time.match(/\d\d:\d\d/);
  let resultArray = result[0].toString().split('');
  let hours = resultArray[0] + resultArray[1];
  let minutes = resultArray[3] + resultArray[4];
   getHourMin = getTime(hours, minutes)
  let weekday = d.getDay();

  if ( weekday == 0 ) {
    result = "Sunday";
} else if ( weekday == 1 ) {
    result = "Monday";
} else if ( weekday == 2 ) {
    result = "Tuesday";
} else if ( weekday == 3 ) {
    result = "Wednesday";
} else if ( weekday == 4 ) {
    result = "Thursday";
} else if ( weekday == 5 ) {
    result = "Friday";
} else if ( weekday == 6 ) {
    result = "Saturday";
} else if ( weekday == 7 ) {
    result = "Sunday";
} else {
    result = "ERROR";
}

return `${getHourMin} ${result}`
}

function getTime(h, m) {
  let hour = h
  if (hour < 12 )  {
    if(hour == 00) {
      return `12:${m} AM`
    }else {
    return `${hour}:${m} AM`
    }
  } else {
    return `${hour - 12}:${m} PM`
  }
}

// Convert Date to bring local hour

function getHour(input) {
  let hour = input.split(':').slice(0,2)
  if (hour[0] <= 12 )  {
    return `${hour[0]}:${hour[1]} AM`
  } else {
    return `${hour[0] - 12}:${hour[1]} PM`
  }
}

// Set up Icon on left side
function getIcon(input) {
  let iconCode = input.weather[0].icon;
  console.log(input.weather[0])
  let iconText = input.weather[0].description;
  let iconLink = `http://openweathermap.org/img/w/${iconCode}.png`;
  image.setAttribute("src", iconLink);
  icon.textContent =  iconText
  }


////////////////////////////////////////////////
// Search Event Listener and function

  const searchCity = function(e) {
    e.preventDefault();
  let searchValue = input.value; 
  // Function
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}`)

  .then(function(response) {
    if(response.status === 200) {
      let data  = response.json();
      return data;
    } else {
      alert("Sorry! could not find city.")
    }
  })
  .then(function(data) {
  toggleHidden()
  let cityName = data.name;
  city.innerText = data.name;
  const temprature = data.main.temp - 273.15;
  degree.innerText = Math.round(temprature) + '°';
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityName + "')"
  time.innerText = getlocalTime(data);
  getIcon(data)
  getWeatherInfo(data);
})
}

const linkSearchCity = function(e) {
e.preventDefault();
let searchValue = this.innerText
// Function
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}`)

.then(function(response) {
  if(response.status === 200) {
    let data  = response.json();
    return data;
  } else {
    alert("Sorry! could not find city.")
  }
})
.then(function(data) {
toggleHidden()
let cityName = data.name;
city.innerText = data.name;
const temprature = data.main.temp - 273.15;
degree.innerText = Math.round(temprature) + '°';
document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityName + "')"
time.innerText = getlocalTime(data);
getWeatherInfo(data);
})
}

input.addEventListener('change', searchCity)
inputButton.addEventListener('click', searchCity)

for (let i = 0; i < link.length ; i++) {
  link[i].addEventListener('click', linkSearchCity)
}
function getWeatherInfo(input) {
  const humidity = document.getElementById('humidity')
  const wind = document.getElementById('wind')
  const country = document.getElementById('country')
  const humidityRes = input.main.humidity;
  const windRes = input.wind.speed * 1.609;
  const windAns = Math.round(windRes);
  const countryRes = input.sys.country
  humidity.textContent = `${humidityRes}%`
  wind.textContent = `${windAns} km/h`;
  country.textContent = countryRes;
}