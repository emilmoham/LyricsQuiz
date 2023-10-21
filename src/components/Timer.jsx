import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { expiryTimestamp, onEnd, gameRunning } = props;

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
    if (gameRunning) start();
    else pause();
  }, [gameRunning, start, pause]);

  return (
    <h3 className='header-side-content timer'>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </h3>
  );
};

Timer.propTypes = {
  expiryTimestamp: PropTypes.object,
  onEnd: PropTypes.func,
  gameRunning: PropTypes.bool
};

export default Timer;
