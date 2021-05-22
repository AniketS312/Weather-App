// Api link - https://www.weatherapi.com/my/
// Async function




// Get Gelo Location

function success(pos) {
   var crd = pos.coords;

   latitude = crd.latitude
   longitude = crd.longitude
   console.log(latitude,longitude)

fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=449b112b351a704b59f676c22cc147a3')
.then(response => response.json())
.then(data => console.log(data))
.catch(err => alert('Could not get city'))

   // console.log('Your current position is:');
   // console.log(`Latitude : ${crd.latitude}`);
   // console.log(`Longitude: ${crd.longitude}`);
   // console.log(`More or less ${crd.accuracy} meters.`);
   
 }
 
 function error(err) {
   console.warn(`ERROR(${err.code}): ${err.message}`);
 }

navigator.geolocation.getCurrentPosition(success, error);

console.log(navigator.geolocation.getCurrentPosition(success, error));