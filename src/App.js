import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "1c0deb60ff5f3e78a9e1d0c6de4b1947";

class App extends Component {
  state = {
    value: "United States of America",
    units: "metric",
    temperature: undefined,
    temp_max:undefined,
    temp_min:undefined,
    humidity: undefined,
    pressure: undefined,
    wind_direction: undefined,
    wind_speed:undefined,
    description: undefined,
    city: undefined,
    country: undefined,
    error: undefined
  };

  tempToggle = (c) => {
    let f = c * 1.8 +32
    console.log(f)
  }
  

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${
        this.state.units
      }&appid=${API_KEY}`
    );
    const data = await api_call.json();

    if (data.cod == 404) {
      console.log(data);
      this.setState({
        temperature: undefined,
        temp_max:undefined,
        temp_min:undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        pressure: undefined,
        wind_direction: undefined,
        wind_speed:undefined,
        description: undefined,
        error:
          "Please enter a valid city or postal code for the selected country"
      });
    } else {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind_direction: data.wind.deg,
        wind_speed:data.wind.speed,
        description: data.weather[0].description,
        error: ""
      });
    }
    // else {
    //   this.setState({
    //     temperature: undefined,
    //     city: undefined,
    //     country: undefined,
    //     humitidy: undefined,
    //     description: undefined,
    //     error: "Do not leave country or city/postal code blank"
    //   });
    // }
  };

  render() {
    return (
      <div>
        <div className="wrapper d-flex align-items-center">
          <div className="main d-flex align-items-center">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xs-2 title-container">
                  <Title />
                </div>
                <div className="col-xs-8 form-container">
                  <Form getWeather={this.getWeather}
                     lol={this.tempToggle(30)} />
                </div>
              </div>
              
              <Weather
                 
                    temperature={this.state.temperature}
                    temp_min={this.state.temp_min}
                    temp_max={this.state.temp_max}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    pressure={this.state.pressure}
                    wind_direction={this.state.wind_direction}
                    wind_speed={this.state.wind_speed}
                    description={this.state.description}
                    error={this.state.error}
                  />
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
