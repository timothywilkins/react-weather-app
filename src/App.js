import './App.css';
import React, { useState, useEffect } from 'react';
import WeatherMain from './components/WeatherMain'
import DailyForecast from './components/DailyForecast';
import Input from './components/Input'
import DataDisplay from './components/DataDisplay';



function App() {

  const [isCelcius, setIsCelcius] = useState(false)
  const [data,setData] = useState(null)
  const [graphData, setGraphData] = useState(null)
  const [mainData, setMainData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [displayTextData, setDisplayTextData] = useState(null)

  function fetchData(resp) {

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

      fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&appid=' + apiKey)
        .then(response => response.json())
        .then((data) => {
          const currentData = data.current;
          const hourlyData = data.hourly;
          const forecastData = data.daily;
          setData(data);
          setMainData(currentData);
          setGraphData(hourlyData);
          setForecastData(forecastData);

          const displayTextData = {
            icon: "",
            temp: "",
            humidity: "",
            wind_speed: "",
            dt: "",
            description: "",
          };

          for (const key in displayTextData) {
            if (data.current.hasOwnProperty(key)) {
              displayTextData[key] = data.current[key];
            } else if (key === "description") {
              displayTextData[key] = data.current.weather[0].description;
            }
            if (key === "icon") {
              displayTextData[key] = data.current.weather[0].icon
            }
          }
          setDisplayTextData(displayTextData)
        })
    }
    function error(err) {
      return err.message
    }
  }

  return (
    <div className="App">
      <div className="inner">
      {!data &&
        <Input fetchData={fetchData} />
        }
        {data &&
          <WeatherMain
            data={displayTextData} isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        }
        {data &&
          <DataDisplay data={graphData} setDisplayTextData={setDisplayTextData} isCelcius={isCelcius}/>
        }
        {data &&
          <DailyForecast data={forecastData} setDisplayTextData={setDisplayTextData} isCelcius={isCelcius}/>
        }
      </div>
    </div>
  );
}

export default App;
