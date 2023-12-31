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

  return (
    <div className='quiz-header'>
      <Timer
        allowedGameSeconds={allowedGameSeconds}
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
