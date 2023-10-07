import React, { useState, useEffect } from 'react';
import './App.css';

import { mockData } from './mockData';
import LineContainer from './components/LineContainer';
import { isAlphaNumeric, isGeniusSectionHeader, isNotAlphaNumeric } from './constants';

const App = () => {
  const [lines, setLines] = useState([]);
  const [revealedWords, setRevealedWords] = useState(new Map());
  const [inputValue, setInputValue] = useState('');

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

  useEffect(() => {
    const sanitizedLyrics = createSanitizedLyricsSet(mockData);
    createLogicalWordsMap(sanitizedLyrics);
    setLines(sanitizedLyrics);
  }, [mockData])
  
  const checkAnswer = (input) => {
    setInputValue(input);
    const logicalWord = convertToLogicalWord(input); 
    if (revealedWords.get(logicalWord) === false) {
      const updatedRevealedWords = new Map(revealedWords)
      updatedRevealedWords.set(logicalWord, true);
      setRevealedWords(updatedRevealedWords);
      setInputValue('');
    }
  }

  return (
    <div className="App">
      <div className='header-container'>
        <h3 className="timer">0:00</h3>
        <h1 className='song-title'>Hold Up</h1>
        <h3 className='score'>0/100</h3>
      </div>
      <div className='lyrics-container'>
        {lines.map((line, index) => {
          return (
            <LineContainer key={index} line={line} revealedWords={revealedWords} />
          );
        })}
      </div>
      <div className='input-container'>
        <input placeholder='Enter Lyrics Here' type="text" value={inputValue} onChange={(e) => checkAnswer(e.target.value)}></input>
      </div>
    </div>
  );
}

export default App;
