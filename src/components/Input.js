import React, { useState, useEffect } from 'react';
import styles from './styles/Input.module.css'

function Input({setLat,setLon }) {
    const [show, setShow] = useState(false);
    const [geoError, setGeoError] = useState(false)

    useEffect(() => {
        setShow(true);
    }, []);

    const easing = `cubic-bezier(0, 0, 0, 1.02)`
    const fadeInStyle = {
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0px)' : 'translateY(35px)',
        transition: `opacity .7s ${easing}, transform 1.1s ${easing}`
    };

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition(success, error);
        function success(position) {
            setGeoError(false)
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
          }
          function error(err) {
            setGeoError("You'll need to allow location on your browser for this app to work.")
          }
    }
    return (
        <div className={styles.wrapper}>
            <div style={fadeInStyle}>
                <button  onClick={handleClick}>get weather forecast in your area!
                </button>
                {geoError?<div>{geoError}</div>:null}
            </div>
        </div>
    );
}

export default Input