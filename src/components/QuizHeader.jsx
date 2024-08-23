import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Stopwatch from './Stopwatch';

const QuizHeader = (props) => {
  const {
    title,
    allowedGameSeconds,
    currentScore,
    maxPossibleScore,
    isGameRunning,
    onTimerExpire,
    timed
  } = props;

  return (
    <div className='quiz-header'>
      {timed
        ? <Timer
            allowedGameSeconds={allowedGameSeconds}
            onEnd={onTimerExpire}
            isGameRunning={isGameRunning}
          />
        : <Stopwatch isGameRunning={isGameRunning} />
      }
      <h1 className='song-title'>{title}</h1>
      <h3 className='header-side-content score'>
        {currentScore}/{maxPossibleScore}
      </h3>
    </div>
  );
};

QuizHeader.propTypes = {
  title: PropTypes.string,
  allowedGameSeconds: PropTypes.number,
  currentScore: PropTypes.number,
  maxPossibleScore: PropTypes.number,
  isGameRunning: PropTypes.bool,
  onTimerExpire: PropTypes.func,
  timed: PropTypes.bool
};

export default QuizHeader;
