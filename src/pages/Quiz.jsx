import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useGameData from '../hooks/useGameData';

import QuizHeader from '../components/QuizHeader';
import AnswerInput from '../components/AnswerInput';
import Lyrics from '../components/Lyrics';
import StartModal from '../components/StartModal';
import EndModal from '../components/EndModal';

function Quiz() {
  const { song } = useParams();
  const [searchParams] = useSearchParams();

  // Game Data
  const gameData = useGameData();

  const [showStart, setShowStart] = useState(true);
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
    if (gameData.isGameRunning) {
      gameData.endQuiz();
    } else {
      setShowResults(true);
    }
  }

  function hideResults() {
    setShowResults(false);
  }

  function start() {
    setShowStart(false);
    gameData.startQuiz();
  }

  function reset() {
    console.log('resetting');
    setShowResults(false);
    setShowStart(true);
    gameData.resetQuiz();
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
        timed={searchParams.get('timed') === '1'}
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
        showModal={showStart}
        isQuizLoaded={gameData.lyrics.length !== 0}
        startGame={start}
      />

      <EndModal
        showModal={showResults}
        onCloseModal={hideResults}
        startTimestamp={gameData.startTimeStamp}
        endTimestamp={gameData.endTimeStamp}
        currentScore={gameData.currentScore}
        maxPossibleScore={gameData.maxPossibleScore}
        resetQuiz={reset}
        title={gameData.title}
      />
    </div>
  );
}

export default Quiz;
