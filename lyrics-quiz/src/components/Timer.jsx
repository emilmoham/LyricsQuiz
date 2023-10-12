import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = (props) => {
    const {
        expiryTimestamp,
        onEnd
    } = props;

    const {
        //totalSeconds,
        seconds,
        minutes,
        // hours,
        // days,
        // isRunning,
        // start,
        // pause,
        //resume,
        //restart,
      } = useTimer({ expiryTimestamp, onExpire: () => onEnd() });


    return (<h3 className='header-side-content timer'>
        {minutes}:{seconds.toString().padStart(2,'0')}
    </h3>);
}

export default Timer;