import './App.css';
import React, { useState, useEffect } from 'react';
import WeatherMain from './components/WeatherMain'
import DailyForecast from './components/DailyForecast';
import Input from './components/Input'
// import WeatherIcon from 'react-open-weather-icon';
import HourlyGraph from './components/HourlyGraph';



function App() {

  const [isCelcius, setIsCelcius] = useState(false)
  const [graphData, setGraphData] = useState(null)
  const [minuteData, setMinuteData] = useState(null)
  const [mainData, setMainData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [mainTextDisplay, setMainTextDisplay] = useState(null)



  function convertTempToCel(kelvin) {
    if (isCelcius) {
      const celsius = kelvin - 273.15;
      return Math.round(celsius)
    }
    else {
      const fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32)
      return Math.round(fahrenheit)
    }
  }


  function processData(resp) {

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

      fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&appid=' + apiKey)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          const currentData = data.current;
          const hourlyData = data.hourly;
          const dailyData = data.daily;
          const minuteData = data.minutely;

          setMainData(currentData);
          setGraphData(hourlyData);
          setForecastData(dailyData);
          setMinuteData(minuteData)

          const displayData = {
            icon: "",
            temp: "",
            humidity: "",
            wind_speed: "",
            dt: "",
            description: "",
          };

          for (const key in displayData) {
            if (currentData.hasOwnProperty(key)) {
              displayData[key] = currentData[key];
            } else if (key === "description") {
              displayData[key] = currentData.weather[0].description;
            }
            if (key === "icon") {
              displayData[key] = currentData.weather[0].icon
            }
          }
          setMainTextDisplay(displayData)
        })

    }
    function error(err) {
      return err.message
    }
  }


  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const time = date.toLocaleTimeString();
    return `${dayOfWeek} ${time}`;
  }
  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${dayOfWeek}`;
  }


  return (
    <div className="App">
      <div className="inner">
      {!mainData &&
        <Input fetchData={processData} />
        }
        {mainData &&
          <WeatherMain
            data={mainTextDisplay} time={formatTimestamp} convertTemp={convertTempToCel} setIsCelcius={setIsCelcius} />
        }
        {graphData &&
          <HourlyGraph data={graphData} minuteData={minuteData} setDisplayData={setMainTextDisplay} time={formatTimestamp} convertTemp={convertTempToCel} />
        }
        {forecastData &&
          <DailyForecast data={forecastData} setDisplayData={setMainTextDisplay} time={formatDay} convertTemp={convertTempToCel} />
        }
      </div>
    </div>
  );
}

export default App;
