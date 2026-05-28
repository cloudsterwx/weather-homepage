// first section of code attributed to https://macondo.hackclub.com/docs/api-homepage
const background = document.getElementById("background");

async function getBackground() {
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=k0CaMY2VEgxpbgD0mEgTekQmi5IThiqGwa2PaUtu";

  try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);

  if (result.media_type !== "image") {
    console.log("APOD returned a non-image media type.");
    return null;
  }

  return result.url;
} catch (error) {
  console.log(error.message);
  return null;
}

} window.onload = function () {
  getBackground().then(function (imageUrl) {
    if (!imageUrl) return;

    console.log(imageUrl);

    if (background) {
      background.style["background-image"] = `url('${imageUrl}')`;
    }
  });
};

setInterval(() => {
let dateObject = new Date();

let totalSeconds = Math.floor(dateObject.getTime() / 1000);

let seconds = totalSeconds % 60;
let minutes = Math.floor(totalSeconds / 60) % 60;
let hours = Math.floor(totalSeconds / 3600) % 24;

let timeDifference = dateObject.getTimezoneOffset() * 60;
let localHours = (hours - Math.floor(timeDifference / 3600)) % 24;

// prevent single digit seconds, minutes, hours by adding leading zeroes to string values
if (seconds < 10) {
  seconds = "0" + String(seconds);
} if (minutes < 10) {
  minutes = "0" + String(minutes);
} if (localHours < 10) {
  localHours = "0" + String(localHours);
}

// display local time, update every 1s (1000ms)
const time = document.getElementById("time");
time.innerText = `${localHours}:${minutes}:${seconds}`;
}, 1000);

// alerts and weather data depend on the user's current location
navigator.geolocation.getCurrentPosition(async function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const result = await fetchWeather(lat,lon);
  let temperature = result.temperature_2m;
  let humidity = result.relative_humidity_2m;
  let windSpeed = result.wind_speed_10m;

  const weather = document.getElementById("weather");
  weather.innerText = `${humidity}% RH, ${temperature}°F, ${windSpeed} mph`;
  const alerts = await fetchWeatherAlerts(lat,lon);
  const alertsDisplay = document.getElementById("alerts");
  alertsDisplay.innerText = alerts;
   })

// fetches weather data from open-meteo API
async function fetchWeather(lat,lon){
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
    const data = await response.json();
    const {temperature_2m, relative_humidity_2m, wind_speed_10m} = data.current;
    return {temperature_2m, relative_humidity_2m, wind_speed_10m};
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }};


async function fetchWeatherAlerts(lat,lon){
  try {
    const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    const data = await response.json();
    const countyID = data.properties.county.split("/").pop();

    // filters to excludes test and hazardous weather outlook alerts
    // maps to get array of alert names
    const alertsResponse = await fetch(`https://api.weather.gov/alerts/active?zone=${countyID}`);
    const alertsData = await alertsResponse.json();
    const alerts = alertsData.features
    .filter(f => f.properties.event !== "Test")
    .filter(f => f.properties.event !== "Hazardous Weather Outlook")
    .map(f => f.properties.event);

    // assigns alerts to alerts element, with formatting based on number of alerts
    const alertsElement = document.getElementById("alerts");
    if(alerts.length > 0 && alerts.length <= 2){
      return alerts.join(", ");
    } else if (alerts.length > 2){
      return `${alerts[0]} and ${alerts.length - 1} more alerts`;
    } else {
      return "No Weather Alerts";
    }
  } catch (error) {
    console.error("Error fetching weather alerts:", error);
    return null;
  }
}

// fetches random cat fact from catfact.ninja API, displays in bottom left corner of page, updates on page load
async function fetchCatFact(){
  try {
    const response = await fetch(`https://catfact.ninja/fact`);
    const data = await response.json();
    return data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return null;
  }
}

  fetchCatFact().then(function(fact){
  const catFactElement = document.getElementById("cat-fact");
  catFactElement.innerText = `Random Cat Fact: ${fact}`;
});