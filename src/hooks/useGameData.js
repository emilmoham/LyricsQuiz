import { useState, useEffect } from 'react';
import { Line } from '../models/Line';
import axios from 'axios';
import { convertToLogicalWord } from '../models/Helpers';

function useGameData() {
  const [rawData, setRawData] = useState(null);
  const [title, setTitle] = useState('Loading...123');
  const [lyrics, setLyrics] = useState([]);
  const [answerMap, setAnswerMap] = useState(new Map());

  // eslint-disable-next-line no-unused-vars
  const [currentScore, setCurrentScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);

  const [isGameRunning, setIsGameRunning] = useState(false);

  const [startTimeStamp, setStartTimestamp] = useState(null);
  const [endTimeStamp, setEndTimestamp] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [allowedGameSeconds, setAllowedGameSeconds] = useState(480);

  function parseLyrics(rawLyrics) {
    return rawLyrics.split(/\n/g).map((rawLine) => Line(rawLine)); // TODO remove blank lines
  }

  function initializeAnswerMap(lyricsSet) {
    const myMap = new Map();

    lyricsSet.map((line) => {
      if (!line.isSectionHeader) {
        line.words.map((word) => {
          if (!myMap.has(word.logicalText)) myMap.set(word.logicalText, false);
          return null;
        });
      }
      return null;
    });

    return myMap;
  }

  function startQuiz() {
    setIsGameRunning(true);
    setStartTimestamp(new Date());
  }

  function endQuiz() {
    setIsGameRunning(false);
    setEndTimestamp(new Date());
  }

  function checkAnswer(input) {
    const logicalWord = convertToLogicalWord(input);
    if (answerMap.get(logicalWord) === false) {
      setAnswerMap((previousData) => {
        const newAnswerMap = new Map(previousData);
        newAnswerMap.set(logicalWord, true);
        return newAnswerMap;
      });
      setCurrentScore(currentScore + 1);
      return true;
    }
    return false;
  }

  function resetQuiz() {
    if (rawData === null) {
      return;
    }

    setTitle(rawData.title);

    const lyricsSet = parseLyrics(rawData.lyrics);
    const initialAnswerMap = initializeAnswerMap(lyricsSet);

    setLyrics(lyricsSet);
    setAnswerMap(initialAnswerMap);

    setCurrentScore(0);
    setMaxPossibleScore(initialAnswerMap.size);

    setIsGameRunning(false);

    setStartTimestamp(null);
    setEndTimestamp(null);
  }

  function loadSong(song) {
    if (song === undefined || song === null) return;
    axios
      .get(`${process.env.REACT_APP_LYRICS_QUIZ_API_HOST}/getGameData/${song}`)
      .then(
        (response) => {
          setRawData(response.data);
        },
        (reason) => {
          setTitle('Error');
          // TODO Log Error properly
          console.log(reason.message);
        }
      );
  }

  useEffect(() => {
    resetQuiz();
  }, [rawData]);

  return {
    title,
    lyrics,
    answerMap,
    currentScore,
    maxPossibleScore,
    isGameRunning,
    startTimeStamp,
    endTimeStamp,
    allowedGameSeconds,
    startQuiz,
    endQuiz,
    checkAnswer,
    loadSong,
    resetQuiz
  };
}

export default useGameData;
