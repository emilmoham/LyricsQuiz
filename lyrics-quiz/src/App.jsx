import React, { useState } from 'react';

import './App.css';

import QuizHeader from './components/QuizHeader';
import Lyrics from './components/Lyrics';
import AnswerInput from './components/AnswerInput';
import EndModal from './components/EndModal';
import GameData from './models/GameData';

const App = () => {
  const url = 'https://genius.com/Beyonce-hold-up-lyrics';

  const [gameData, setGameData] = useState({
    title: "Loading...",
    lyrics: [],
    revealedWords: new Map()
  });

  GameData(url).then((data) => {
    setGameData(data);
  });

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const onGameEnd = () => {
    setGameOver(true);
  }

  return (
    <div className="App">
      <QuizHeader songTitle={gameData.title} revealedWords={gameData.revealedWords} onTimerExpire={onGameEnd} />
      <Lyrics gameData={gameData} />
      <AnswerInput gameData={gameData} isGameOver={gameOver}/>
      <EndModal isGameOver={gameOver} revealedWords={gameData.revealedWords} />
    </div>
  );
}

export default App;
