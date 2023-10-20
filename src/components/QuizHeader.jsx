import React from 'react';
import Timer from './Timer';

const QuizHeader = (props) => {
  const { gameData, onTimerExpire } = props;

  const setTimer = () => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + gameData.allowedGameSeconds);
    return d;
  };

  return (
    <div className="quiz-header">
      <Timer
        expiryTimestamp={setTimer()}
        onEnd={onTimerExpire}
        gameRunning={gameData.gameRunning}
      />
      <h1 className="song-title">{gameData.title}</h1>
      <h3 className="header-side-content score">
        {gameData.currentScore}/{gameData.maxPossibleScore}
      </h3>
    </div>
  );
};

export default QuizHeader;
