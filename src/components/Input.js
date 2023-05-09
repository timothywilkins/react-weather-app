import React from 'react';
import styles from './styles/Input.module.css'

function Input({ fetchData}) {

    return (
        <div className={styles.wrapper}>
            <div>
                <button onClick={function (e) { fetchData() }}>get weather forecast in your area!</button>
            </div>
        </div>
    );
}

export default Input