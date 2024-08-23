import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import PropTypes from 'prop-types';

const Stopwatch = (props) => {
  const { isGameRunning } = props;

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    reset,
    pause
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (isGameRunning) {
      reset();
    } else {
      pause();
    }
  }, [isGameRunning]);

  return (
    <h3 className='header-side-content timer'>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </h3>
  );
};

Stopwatch.propTypes = {
  isGameRunning: PropTypes.bool
};

export default Stopwatch;
