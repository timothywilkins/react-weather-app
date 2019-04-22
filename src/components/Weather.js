import React from "react";



const Weather = props => (
  <div className="weather__info">
    <div className="row justify-content-center">
      {props.city && props.country && (
        <p className="weather__key">
          Location: <span className="weather__value">
            {props.city}, {props.country}
          </span>
        </p>
      )}
    </div>
    {/* {props.city && props.country && (
    <button className="center-block">Toggle C/F</button>
    )} */}
    <div className="row d-flex justify-content-around">
      <div className="col-xs-6">
        {props.temperature && (
          <p className="weather__key">
            Temperature:{" "}
            <span className="weather__value">{props.temperature}</span>
          </p>
        )}
        {props.temp_min && (
          <p className="weather__key">
            Minimum Temperature:{" "}
            <span className="weather__value">{props.temp_min}</span>
          </p>
        )}

        {props.temp_max && (
          <p className="weather__key">
            Maximum Temperature:{" "}
            <span className="weather__value">{props.temp_max}</span>
          </p>
        )}
        {props.humidity && (
          <p className="weather__key">
            Humidity: <span className="weather__value">{props.humidity}</span>
          </p>
        )}
      </div>

      <div className="col-xs-6">
        {props.pressure && (
          <p className="weather__key">
            Pressure: <span className="weather__value">{props.pressure}</span>
          </p>
        )}
        {props.wind_direction && (
          <p className="weather__key">
            Wind Direction:{" "}
            <span className="weather__value">{props.wind_direction}</span>
          </p>
        )}
        {props.wind_speed && (
          <p className="weather__key">
            Wind Speed:{" "}
            <span className="weather__value">{props.wind_speed}</span>
          </p>
        )}
        {props.description && (
          <p className="weather__key">
            Conditions:{" "}
            <span className="weather__value">{props.description}</span>
          </p>
        )}
      </div>
    </div>

    {props.error && <p className="weather__key">{props.error}</p>}
    {/* {props.lol} */}
  </div>
);

export default Weather;
