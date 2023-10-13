import React, { useEffect, useState } from 'react';

import { initializeGameData, createGameDataCallbacks } from './models/GameData'

import QuizHeader from './components/QuizHeader';
import Lyrics from './components/Lyrics';
import AnswerInput from './components/AnswerInput';
import EndModal from './components/EndModal';

import './App.css';
import StartModal from './components/StartModal';

const App = () => {
  const url = 'https://genius.com/Beyonce-hold-up-lyrics';

  // Game Data
  const [gameData, setGameData] = useState(initializeGameData(url));
  const callbacks = createGameDataCallbacks(setGameData);
  
  const startGame = () => {
    callbacks.startGame();
  }

  const endGame = () => {
    callbacks.endGame();
  }

  useEffect(() => {
    if(gameData.currentScore === gameData.maxPossibleScore)
      callbacks.endGame();
  }, [gameData.currentScore])
  
  return (
    <div className="App">
      <QuizHeader gameData={gameData} onTimerExpire={endGame} />
      <AnswerInput gameData={gameData} onCheckAnswer={callbacks.checkAnswer} />
      <Lyrics gameData={gameData} />
      <StartModal gameData={gameData} startGame={startGame} />
      <EndModal gameData={gameData} />
    </div>
  );
}

export default App;
