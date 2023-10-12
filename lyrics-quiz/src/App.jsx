import React, { useEffect, useState } from 'react';

import { initailizeGameData, createGameDataCallbacks } from './models/GameData'

import QuizHeader from './components/QuizHeader';
import Lyrics from './components/Lyrics';
import AnswerInput from './components/AnswerInput';
import EndModal from './components/EndModal';

import './App.css';

const App = () => {
  const url = 'https://genius.com/Beyonce-hold-up-lyrics';

  // Game Data
  const [gameOver, setGameOver] = useState(false);
  
  const [gameData, setGameData] = useState(initailizeGameData(url));
  const callbacks = createGameDataCallbacks(setGameData);
  
  const onGameEnd = () => {
    setGameOver(true);
  }

  useEffect(() => {
    if(gameData.currentScore === gameData.maxPossibleScore)
      setGameOver(true);
  }, [gameData.currentScore])

  
  return (
    <div className="App">
      <QuizHeader gameData={gameData} allotedGameTime={5} onTimerExpire={onGameEnd} />
      <AnswerInput gameData={gameData} onCheckAnswer={callbacks.checkAnswer} isGameOver={gameOver} />
      <Lyrics gameData={gameData} />
      <EndModal isGameOver={gameOver} gameData={gameData} />
    </div>
  );
}

export default App;
