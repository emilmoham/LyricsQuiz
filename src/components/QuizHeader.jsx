import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

const QuizHeader = (props) => {
  const {
    title,
    allowedGameSeconds,
    currentScore,
    maxPossibleScore,
    isGameRunning,
    onTimerExpire
  } = props;

  const setTimer = () => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + allowedGameSeconds);
    return d;
  };

  return (
    <div className='quiz-header'>
      <Timer
        expiryTimestamp={setTimer()}
        onEnd={onTimerExpire}
        isGameRunning={isGameRunning}
      />
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
  onTimerExpire: PropTypes.func
};

export default QuizHeader;
