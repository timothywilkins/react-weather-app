import React, { useState } from 'react';
import {} from './utils.js';
import TemperatureGraph from './TemperatureGraph.js';
import WindGraph from './WindGraph.js';
import styles from './styles/DataDisplay.module.css'

function HourlyGraph(props) {

  const [activeTab, setActiveTab] = useState('temperature');
  
  const data = props.data

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (

    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <div onClick={() => handleClick('temperature')} className={activeTab === 'temperature' ? styles.active : null}>Temperature</div>
        <span></span>
        <div onClick={() => handleClick('wind')} className={activeTab === 'wind' ? styles.active : null}>Wind</div>
      </div>
      <div className={styles.content}>
        {activeTab === 'temperature' && (
          <TemperatureGraph data={data} isCelcius={props.isCelcius} />
        )}
        {activeTab === 'wind' && (
          <WindGraph data={props.data} />
        )}
      </div>
    </div >
  );
}

export default HourlyGraph;