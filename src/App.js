import './App.css';
import React, { useState, useEffect } from 'react';
import WeatherMain from './components/WeatherMain'
import DailyForecast from './components/DailyForecast';
import Input from './components/Input'
import DataDisplay from './components/DataDisplay';



function App() {
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const [apiError,setApiError] = useState(null)
  const [isCelcius, setIsCelcius] = useState(false)
  const [data, setData] = useState(null)
  const [graphData, setGraphData] = useState(null)
  const [mainData, setMainData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [displayTextData, setDisplayTextData] = useState(null)

  useEffect(() => {
    if (lat !== null && lon !== null) {
      const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setMainData(data.current);
          setGraphData(data.hourly);
          setForecastData(data.daily);
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
        .catch(error => setApiError(error))
    }
  }, [lat, lon]);

  return (
    <div className="App">
      <div className="inner">
        {!data &&
          <Input setLat={setLat} setLon={setLon} />
        }
        {data?
          <WeatherMain
            data={displayTextData} isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
            : <div>{apiError}</div>
        }
        {data &&
          <DataDisplay data={graphData} setDisplayTextData={setDisplayTextData} isCelcius={isCelcius} />
        }
        {data &&
          <DailyForecast data={forecastData} setDisplayTextData={setDisplayTextData} isCelcius={isCelcius} />
        }
      </div>
    </div>
  );
}

export default App;
