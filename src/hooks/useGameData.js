import { useState, useEffect } from 'react';
import { Line } from '../models/Line';
import axios from 'axios';

function useGameData() {
    const [title, setTitle] = useState('Loading...123');
    const [lyrics, setLyrics] = useState([]);
    const [answerMap, setAnswerMap] = useState(new Map());
    
    const [currentScore, setCurrentScore] = useState(0);
    const [maxPossibleScore, setMaxPossibleScore] = useState(0);

    const [isGameRunning, setIsGameRunning] = useState(false);
    
    const [startTimeStamp, setStartTimestamp] = useState(null);
    const [endTimeStamp, setEndTimestamp] = useState(null);

    const [allowedGameSeconds, setAllowedGameSeconds] = useState(480);

    function parseLyrics(rawLyrics) {
      return rawLyrics.split(/\n/g).map((rawLine) => Line(rawLine)); // TODO remove blank lines
    }

    function initializeAnswerMap(lyricsSet) {
      const myMap = new Map()

      lyricsSet.map((line) => {
        if (!line.isSectionHeader) {
          line.words.map((word) => {
            if (!myMap.has(word.logicalText))
              myMap.set(word.logicalText, false);
          })
        }
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

    function checkAnswer() {
      return true; // TODO
    }

    function loadSong(song) {
      console.log(song);
      if (song === undefined || song === null)
        return;
      axios.get(`${process.env.REACT_APP_LYRICS_QUIZ_API_HOST}/getGameData/${song}`).then((response) => {
        setTitle(response.data.title);

        const lyricsSet = parseLyrics(response.data.lyrics);
        const initialAnswerMap = initializeAnswerMap(lyricsSet);
        
        setLyrics(lyricsSet);
        setAnswerMap(initialAnswerMap);
        setMaxPossibleScore(answerMap.size)
      }, (reason) => {
        setTitle('Error');
        //setLyrics(parseLyrics(response.data.lyrics));

        // TODO Log Error properly
        console.log(reason.message);
      });

    }

    return {
        title: title,
        lyrics: lyrics,
        answerMap: answerMap,
        currentScore: currentScore,
        maxPossibleScore: maxPossibleScore,
        isGameRunning: isGameRunning,
        startTimeStamp: startTimeStamp,
        endTimeStamp: endTimeStamp,
        allowedGameSeconds: allowedGameSeconds,
        startQuiz: startQuiz,
        endQuiz: endQuiz,
        checkAnswer: checkAnswer,
        loadSong: loadSong,
    }
}

export default useGameData;