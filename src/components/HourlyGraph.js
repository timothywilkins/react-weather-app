import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import styles from './styles/HourlyGraph.module.css'

function HourlyGraph(props) {

  const [activeTab, setActiveTab] = useState('temperature');

  function convertToMinutes(timestamp) {
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = date.getMinutes();
    return hours+":"+minutes
    // Seconds part from the timestamp
  }

  function convertToHours(timestamp) {
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = date.getMinutes();
    return hours+":00"
    // Seconds part from the timestamp
  }

  function convertTemps(arr, conversionFunction) {
    return arr.map((obj) => {
      return {
        ...obj,
        temp: conversionFunction(obj.temp)
      };
    });
  }
  function minuteConverter(arr, conversionFunction) {
    return arr.map((obj) => {
      return {
        ...obj,
        dt: conversionFunction(obj.dt)
      };
    });
  }

  const data = convertTemps(props.data, props.convertTemp);
  const newData = minuteConverter(data, convertToHours)
  const minuteData = minuteConverter(props.minuteData,convertToMinutes)

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };


  return (

    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <div onClick={() => handleClick('temperature')}>Temperature</div>
        <span></span>
        <div onClick={() => handleClick('precipitation')}>Precipitation</div>
        {/* <span></span>
        <div onClick={() => handleClick('wind')}>Wind</div> */}
      </div>
      {activeTab === 'temperature' && (
        <div style={{ height: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={newData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dt" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="temp" stroke="#ffe600" fill="#fff3c9" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      {activeTab === 'precipitation' && (
        <div style={{ height: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={minuteData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dt" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precipitation" fill="#8884d8" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {activeTab === 'wind' && (
        <div style={{ height: "200px" }}>
          <div>wind stuff</div>
        </div>
      )}
    </div >





  );
}

export default HourlyGraph;