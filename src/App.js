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


  return (
    <div className="App">
      <div className="inner">
      {!mainData &&
        <Input fetchData={processData} />
        }
        {mainData &&
          <WeatherMain
            data={mainTextDisplay} isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        }
        {graphData &&
          <HourlyGraph data={graphData} minuteData={minuteData} setDisplayData={setMainTextDisplay} isCelcius={isCelcius}/>
        }
        {forecastData &&
          <DailyForecast data={forecastData} setDisplayData={setMainTextDisplay} isCelcius={isCelcius}/>
        }
      </div>
    </div>
  );
}

export default App;
