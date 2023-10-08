import React, { useState } from "react";
import { convertToLogicalWord } from "../models/Helpers";

const AnswerInput = (props) => {
    const {
        gameData,
        isGameOver
    } = props;

    const [inputValue, setInputValue] = useState('');

    const checkAnswer = (input) => {
        setInputValue(input);
        const logicalWord = convertToLogicalWord(input); 
        if (gameData.revealedWords.get(logicalWord) === false) {
            const updatedRevealedWords = new Map(gameData.revealedWords)
            updatedRevealedWords.set(logicalWord, true);
            
            //setScore(score + 1);
            
            //setRevealedWords(updatedRevealedWords);
            setInputValue('');
        }
      }

    return (
    <div className='input-container'>
        <input disabled={isGameOver} placeholder='Enter Lyrics Here' type="text" value={inputValue} onChange={(e) => checkAnswer(e.target.value)}></input>
    </div>);
}

export default AnswerInput;