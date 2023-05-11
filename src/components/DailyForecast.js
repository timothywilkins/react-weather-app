import React from 'react';
import { useState } from 'react';
import {convertTemp, formatDay} from './utils.js';
import styles from './styles/DailyForecast.module.css'

function DailyForecast(props) {
    const isCelcius = props.isCelcius
    const data = props.data;
    const setDisplayTextData = props.setDisplayTextData;

    const [selectedDivIndex, setSelectedDivIndex] = useState(null);

    const handleDivClick = (index) => {
        setSelectedDivIndex(index);
        const displayData = {
            icon: "",
            temp: "",
            humidity: "",
            wind_speed: "",
            dt: "",
            description: "",
        };
        for (const key in displayData) {
            if (data[index].hasOwnProperty(key)) {
                displayData[key] = data[index][key];
            } else if (key === "description") {
                displayData[key] = data[index].weather[0].description;
            }
            if (key === "temp") {
                displayData[key] = data[index].temp.day;    
            }
            if (key === "icon") {
                displayData[key] = data[index].weather[0].icon
            }
        }
        setDisplayTextData(displayData)
    };


    return (
        <div className={styles.wrapper}>
            {props.data && props.data.length > 0 &&
                props.data.map((forecast, index) => (
                    <div key={index} onClick={() => handleDivClick(index)} className={selectedDivIndex === index ? styles.selectedCard : ""}>
                        <div>{formatDay(forecast.dt)}</div>
                        <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="weather icon" />
                        <div>{convertTemp(forecast.temp.min, isCelcius)} / {convertTemp(forecast.temp.max, isCelcius)}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default DailyForecast;