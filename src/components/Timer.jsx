import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { allowedGameSeconds, onEnd, isGameRunning } = props;

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    pause,
    // resume,
    restart
  } = useTimer({ autoStart: false, onExpire: () => onEnd() });

  const setTimer = () => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + allowedGameSeconds);
    return d;
  };

  useEffect(() => {
    if (isGameRunning) {
      restart(setTimer());
      console.log('timer started');
    } else {
      pause();
      console.log('timer stopped');
    }
  }, [isGameRunning, restart, pause]);

  return (
    <h3 className='header-side-content timer'>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </h3>
  );
};

Timer.propTypes = {
  allowedGameSeconds: PropTypes.number,
  onEnd: PropTypes.func,
  isGameRunning: PropTypes.bool
};

export default Timer;
