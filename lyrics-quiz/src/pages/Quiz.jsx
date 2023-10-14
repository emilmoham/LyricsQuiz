import React, {useEffect, useState} from 'react';

import { initializeGameData, createGameDataCallbacks } from '../models/GameData'

import QuizHeader from '../components/QuizHeader';
import Lyrics from '../components/Lyrics';
import AnswerInput from '../components/AnswerInput';
import EndModal from '../components/EndModal';
import StartModal from '../components/StartModal';

import { useParams } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const {
    song
  } = useParams();

  // Game Data
  const [gameData, setGameData] = useState(initializeGameData(null));
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

  useEffect(() => {
    axios.get(`http://localhost:8001/getGameData/${song}`).then((response) => {
      setGameData(initializeGameData(response));
    }, (reason) => {
      console.log(reason.message);
      setGameData((prevData) => {
        return { ...prevData, title: "Error Generating Quiz"}
      })
    });
  }, [])
  
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