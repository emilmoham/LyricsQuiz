import React, {useEffect, useState} from 'react';

import { initializeGameData, createGameDataCallbacks } from '../models/GameData'

import QuizHeader from '../components/QuizHeader';
import Lyrics from '../components/Lyrics';
import AnswerInput from '../components/AnswerInput';
import EndModal from '../components/EndModal';
import StartModal from '../components/StartModal';

const Quiz = () => {
    const url = 'https://genius.com/Beyonce-hold-up-lyrics';

  // Game Data
  const [gameData, setGameData] = useState(initializeGameData(url));
  const callbacks = createGameDataCallbacks(setGameData);

  const [showResults, setShowResults] = useState(false);
  
  const startGame = () => {
    callbacks.startGame();
  }

  const endGame = () => {
    callbacks.endGame();
    setShowResults(true);
  }

  const onClickEndQuizButton = () => {
    if (gameData.isGameOver) {
      setShowResults(true);
    } else {
      endGame();
    }
  }

  const hideResults = () => {
    setShowResults(false);
  }

  useEffect(() => {
    if(gameData.currentScore === gameData.maxPossibleScore)
      callbacks.endGame();
  }, [gameData.currentScore])
  
  return (
    <div className='quiz-container'>
      <QuizHeader gameData={gameData} onTimerExpire={endGame} />
      <div className='user-input-container'>
        <button className='end-quiz-button' onClick={onClickEndQuizButton}>{gameData.isGameOver ? 'Show Results' : 'Reveal Answers'}</button>
        <AnswerInput gameData={gameData} onCheckAnswer={callbacks.checkAnswer} />
      </div>
      <Lyrics gameData={gameData} />
      <StartModal gameData={gameData} startGame={startGame} />
      <EndModal gameData={gameData} showModal={showResults} onCloseModal={hideResults}/>
    </div>
  );
}

export default Quiz;