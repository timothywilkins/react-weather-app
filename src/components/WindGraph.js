import React from 'react';
import { convertToHours } from './utils.js';
import Arrow from './Arrow.js';
import styles from './styles/DataDisplay.module.css'

function WindGraph(props) {

    const windCards = props.data

    return (
        <div className={styles.windWrapper}>
            {windCards.map((windCard, i) => (
                <div className={styles.windCard} key={i}>
                    <div>{windCard.wind_speed}</div>
                    <div className={styles.arrowWrapper}
                        style={{ transform: 'rotate(' + (windCard.wind_deg + 90) + 'deg)' }}
                        >
                        <Arrow className={styles.arrowIcon}></Arrow>
                    </div>
                    <div>{convertToHours(windCard.dt)}</div>
                </div>
            ))}
        </div>
    )
}

export default WindGraph;