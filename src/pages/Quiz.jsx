import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGameData from '../hooks/useGameData';

import QuizHeader from '../components/QuizHeader';
import AnswerInput from '../components/AnswerInput';
import Lyrics from '../components/Lyrics';
import StartModal from '../components/StartModal';
import EndModal from '../components/EndModal';

function Quiz() {
  const { song } = useParams();

  // Game Data
  const gameData = useGameData();

  const [showResults, setShowResults] = useState(false);

  // Load quiz data
  useEffect(() => {
    gameData.loadSong(song);
  }, [song]);

  // Watch for game end
  useEffect(() => {
    if (gameData.maxPossibleScore > 0) {
      if (gameData.currentScore === gameData.maxPossibleScore) {
        gameData.endQuiz();
      }
    }
  }, [gameData.currentScore, gameData.maxPossibleScore]);

  // Show the end modal when the game ends.
  useEffect(() => {
    if (gameData.endTimeStamp !== null) {
      setShowResults(true);
    }
  }, [gameData.endTimeStamp]);

  function onClickEndQuizButton(e) {
    e.preventDefault();
    if (gameData.isGameOver) {
      setShowResults(true);
    } else {
      gameData.endQuiz();
    }
  }

  function hideResults() {
    setShowResults(false);
  }

  return (
    <div className='quiz-container'>
      <QuizHeader
        title={gameData.title}
        allowedGameSeconds={gameData.allowedGameSeconds}
        currentScore={gameData.currentScore}
        maxPossibleScore={gameData.maxPossibleScore}
        isGameRunning={gameData.isGameRunning}
        onTimerExpire={gameData.endQuiz}
      />

      <div className='user-input-container'>
        <button className='end-quiz-button' onClick={onClickEndQuizButton}>
          {gameData.endTimeStamp !== null ? 'Show Results' : 'Reveal Answers'}
        </button>
        <AnswerInput
          isGameRunning={gameData.isGameRunning}
          checkAnswer={gameData.checkAnswer}
        />
      </div>

      <Lyrics
        lyrics={gameData.lyrics}
        answerMap={gameData.answerMap}
        gameEndTimestamp={gameData.endTimeStamp}
      />

      <StartModal
        showModal={gameData.startTimeStamp === null}
        isQuizLoaded={gameData.lyrics.length !== 0}
        startGame={gameData.startQuiz}
      />

      <EndModal
        showModal={showResults}
        onCloseModal={hideResults}
        startTimestamp={gameData.startTimeStamp}
        endTimestamp={gameData.endTimeStamp}
        currentScore={gameData.currentScore}
        maxPossibleScore={gameData.maxPossibleScore}
      />
    </div>
  );
}

export default Quiz;
