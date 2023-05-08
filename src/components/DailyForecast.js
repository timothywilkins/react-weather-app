import React from 'react';
import { useState } from 'react';
import styles from './styles/DailyForecast.module.css'

function DailyForecast(props) {
    const data = props.data;
    const setDisplayData = props.setDisplayData;

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
        setDisplayData(displayData)
        console.log(displayData)
    };


    return (
        <div className={styles.wrapper}>
            {props.data && props.data.length > 0 &&
                props.data.map((forecast, index) => (
                    <div key={index} onClick={() => handleDivClick(index)} className={selectedDivIndex === index ? styles.selectedCard : ""}>
                        <div>{props.time(forecast.dt)}</div>
                        <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                        <div>{props.convertTemp(forecast.temp.min)} / {props.convertTemp(forecast.temp.max)}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default DailyForecast;