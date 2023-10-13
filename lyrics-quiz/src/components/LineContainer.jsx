import React, { useEffect, useState } from "react";

const LineContainer = (props) => {
    const {
        line,
        revealedWords,
        isGameOver
    } = props;

    const renderWord = (word) => {
        if (revealedWords.get(word.logicalText)) {
            return (word.revealedText + ' ');
        }

        if (isGameOver) {
            return <span className='missed-word'>{word.revealedText + ' '}</span>
        }

        return word.hiddenText + ' ';
    }

    return (
        <div className="line">
            <p>{line.words.map((word) => renderWord(word))}</p>
        </div>
    );
}

export default LineContainer;