import React from 'react';
import { useState, useEffect } from 'react';
import { convertTemp, formatTimestamp } from './utils.js';
import styles from './styles/WeatherMain.module.css';


function WeatherMain(props) {

  const { dt, temp, humidity, wind_speed, description, icon } = props.data;
  const convertedTemp = convertTemp(temp, props.isCelcius)
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className={styles.wrapper}>
          <div>Weather</div>
          <div className={styles.date}>{formatTimestamp(dt)}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.temp}>{convertedTemp}°</div>

              <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
            </div>
            <div className={styles.textAlignRight}>
              <div className={styles.description}>{description}</div>
              <div>
                <div>humidity: {humidity}</div>
                <div>wind: {wind_speed}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={`${styles.flex} ${styles.spaceBetween}`}>
            <div className={`${styles.flex} ${styles.flexBasis} ${styles.alignItems} ${styles.columnGap}`}>
              <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
              <div className={styles.temp}>{convertedTemp}
                <span>
                  <a onClick={() => props.setIsCelcius(false)}>°F</a>|<a onClick={() => props.setIsCelcius(true)}>°C</a>
                </span>

              </div>
              <div className={styles.weatherProperties}>
                <div>Humidity: {humidity}</div>
                <div>Wind: {wind_speed}</div>
              </div>
            </div>
            <div className={styles.description}>
              <div>Weather</div>
              <div>{formatTimestamp(dt)}</div>
              <div>{description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )



}

export default WeatherMain