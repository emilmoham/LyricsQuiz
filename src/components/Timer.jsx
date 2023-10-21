import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { expiryTimestamp, onEnd, isGameRunning } = props;

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    start,
    pause
    // resume,
    // restart,
  } = useTimer({ autoStart: false, expiryTimestamp, onExpire: () => onEnd() });

  useEffect(() => {
    if (isGameRunning) start();
    else pause();
  }, [isGameRunning, start, pause]);

  return (
    <h3 className='header-side-content timer'>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </h3>
  );
};

Timer.propTypes = {
  expiryTimestamp: PropTypes.object,
  onEnd: PropTypes.func,
  isGameRunning: PropTypes.bool
};

export default Timer;
