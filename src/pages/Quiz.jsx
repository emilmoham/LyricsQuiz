import React, { useCallback, useEffect, useState } from 'react';

import { initializeGameData, createGameDataCallbacks } from '../models/GameData';

import QuizHeader from '../components/QuizHeader';
import Lyrics from '../components/Lyrics';
import AnswerInput from '../components/AnswerInput';
import EndModal from '../components/EndModal';
import StartModal from '../components/StartModal';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { song } = useParams();

  // Game Data
  const [gameData, setGameData] = useState(initializeGameData(null));
  const callbacks = createGameDataCallbacks(setGameData);

  const [showStartScreen, setShowStartScren] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const startGame = () => {
    setShowStartScren(false);
    callbacks.startGame();
  };

  const endGame = useCallback(() => {
    callbacks.endGame();
    setShowResults(true);
  }, [callbacks, setShowResults]);

  const onClickEndQuizButton = () => {
    if (gameData.isGameOver) {
      setShowResults(true);
    } else {
      endGame();
    }
  };

  const hideResults = () => {
    setShowResults(false);
  };

  useEffect(() => {
    if (gameData.currentScore === gameData.maxPossibleScore && gameData.maxPossibleScore > 0) {
      endGame();
    }
    // eslint-disable-next-line
  }, [gameData.currentScore]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_LYRICS_QUIZ_API_HOST}/getGameData/${song}`).then(
      (response) => {
        setGameData(initializeGameData(response));
      },
      (reason) => {
        console.log(reason.message);
        setGameData((prevData) => {
          return { ...prevData, title: 'Error Generating Quiz' };
        });
      }
    );
  }, [song]);

  return (
    <div className='quiz-container'>
      <QuizHeader gameData={gameData} onTimerExpire={endGame} />
      <div className='user-input-container'>
        <button className='end-quiz-button' onClick={onClickEndQuizButton}>
          {gameData.isGameOver ? 'Show Results' : 'Reveal Answers'}
        </button>
        <AnswerInput gameData={gameData} onCheckAnswer={callbacks.checkAnswer} />
      </div>
      <Lyrics gameData={gameData} />
      <StartModal gameData={gameData} showModal={showStartScreen} startGame={startGame} />
      <EndModal gameData={gameData} showModal={showResults} onCloseModal={hideResults} />
    </div>
  );
}

export default Quiz;
