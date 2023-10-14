import React, { useState, useEffect } from "react";
import { convertToLogicalWord } from "../models/Helpers";

const AnswerInput = (props) => {
    const {
        gameData,
        onCheckAnswer,
    } = props;

    const [inputValue, setInputValue] = useState('');

    const checkAnswer = (input) => {
        setInputValue(input);
        let sanitizedInput = convertToLogicalWord(input);
        if (gameData.answerMap.get(sanitizedInput) === false) {
            onCheckAnswer(sanitizedInput);
            setInputValue('');
        }
    }

    return (
        <input
            autoFocus
            className='answer-input'
            disabled={gameData.isGameOver} 
            placeholder='Enter Lyrics Here' 
            type="text" value={inputValue} 
            onChange={(e) => checkAnswer(e.target.value)} />);
}

export default AnswerInput;