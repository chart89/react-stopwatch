import styles from './StopWatch.module.scss';
import { useState } from "react";
import { useEffect } from "react";


const StopWatch = () => {
    
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const [pause, setPause] = useState(true);

    useEffect(() => {
        let timer = null; 
    
        if (start && pause === false){
            timer = setInterval(() => {
                setTime(time => time + 1);
            }, 1);
        } else {
            clearInterval(timer);
        };
        return () => {
            clearInterval(timer)
        }
    }, [start, pause]);

    //method to start time
    const timeStart = () => {
        setStart(true);
        setPause(false);
    }

    //method to pause time
    const timePause = () => {
        setPause(true);
    }

    //method to reset time using RESET button or when the state is remove
    const timeReset = () => {
        setStart(false);
        setTime(0);
    }

    /* convert milliseconds to H:M:S - based on Internet */
    const milliseconds = time % 100;
    
    const seconds = Math.floor((time / 1000) % 60);

    const minutes = Math.floor((time / 1000 / 60) % 60);

    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
   
    return (
         <div className={styles.maindiv}>
            <div><span>{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:{milliseconds.toString().padStart(2, "0")}</span></div>
            <div>
                <button onClick={() => timeStart()}>START</button>
                <button onClick={() => timePause()}>PAUSE</button>
                <button onClick={() => timeReset()}>RESET</button>
            </div>
         </div>
         
    );
};

export default StopWatch;