import React, { useState, useEffect } from 'react';
import './App.css';

import { mockData } from './mockData';
import LineContainer from './components/LineContainer';
import Timer from './components/Timer';
import { isGeniusSectionHeader, isNotAlphaNumeric } from './constants';
import ReactModal from 'react-modal';

import useApiService from './services/APIService';

const App = () => {
  const url = 'https://genius.com/Beyonce-hold-up-lyrics';
  const [gameData, setGameData] = useState(null);
  const [lines, setLines] = useState([]);
  const [revealedWords, setRevealedWords] = useState(new Map());
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const {
    getGameData
  } = useApiService();

  const convertToLogicalWord = (input) => {
    let logicalWord = input.toLowerCase();
    logicalWord = logicalWord.replace(isNotAlphaNumeric, '');
    return logicalWord;
  }

  const createSanitizedLyricsSet = (lyrics) => {
    let finalLineSet = [];
    let rawLineSet = lyrics.split('\n');
    for(let i = 0; i < rawLineSet.length; i++) {
      let line = rawLineSet[i];
      if (line.length !== 0)
        finalLineSet.push(line);
    }
    return finalLineSet;
  }

  const createLogicalWordsMap = (lyricsSet) => {
    let revealedWordsMap = new Map();

    for(let i = 0; i < lyricsSet.length; i++) {
      let line = lyricsSet[i];
      
      if (line.match(isGeniusSectionHeader) !== null)
        continue;

      
      let words = line.split(' ');
      for (let j = 0; j < words.length; j++) {
        let word = convertToLogicalWord(words[j])
        if (revealedWordsMap.get(word) === undefined)
          revealedWordsMap.set(word, false);
      }
    }

    setRevealedWords(revealedWordsMap);
  }
  
  const checkAnswer = (input) => {
    setInputValue(input);
    const logicalWord = convertToLogicalWord(input); 
    if (revealedWords.get(logicalWord) === false) {
      const updatedRevealedWords = new Map(revealedWords)
      updatedRevealedWords.set(logicalWord, true);
      
      setScore(score + 1);
      
      setRevealedWords(updatedRevealedWords);
      setInputValue('');
    }
  }

  const setTimer = () => {
    let d = new Date();
    d.setSeconds(d.getSeconds() + 15);
    return d;
  }

  const onGameEnd = () => {
    setGameOver(true);
  }

  useEffect(() => {
    // getGameData(url).then((res) => {
    //   console.log(res.data);
    //   setGameData(res.data);
    // });
    setGameData(mockData);    
  }, [url])

  useEffect(() => {
    if (gameData !== null && gameData.lyrics !== undefined) {
      const sanitizedLyrics = createSanitizedLyricsSet(gameData.lyrics);
      createLogicalWordsMap(sanitizedLyrics);
      setLines(sanitizedLyrics);
    }
  }, [gameData])

  return (
    <div className="App">
      <div className='header-container'>
        <Timer expiryTimestamp={setTimer()} onEnd={onGameEnd} />
        <h1 className='song-title'>{gameData.title}</h1>
        <h3 className='score'>{score}/{revealedWords.size}</h3>
      </div>
      <div className='lyrics-container'>
        {lines.map((line, index) => {
          return (
            <LineContainer key={index} line={line} revealedWords={revealedWords} />
          );
        })}
      </div>
      <div className='input-container'>
        <input disabled={gameOver} placeholder='Enter Lyrics Here' type="text" value={inputValue} onChange={(e) => checkAnswer(e.target.value)}></input>
      </div>
      <ReactModal
        isOpen={gameOver} >
        <h1>Final Score:</h1>
        <p>{score}/{revealedWords.size}</p>
      </ReactModal>
    </div>
  );
}

export default App;
