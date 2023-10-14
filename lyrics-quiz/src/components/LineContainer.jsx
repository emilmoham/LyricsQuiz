import React from "react";

const LineContainer = (props) => {
    const {
        line,
        revealedWords,
        isGameOver
    } = props;

    const renderWord = (word, key) => {
        if (revealedWords.get(word.logicalText)) {
            return (word.revealedText + ' ');
        }

        if (isGameOver) {
            return <span key={key} className='missed-word'>{word.revealedText + ' '}</span>
        }

        return word.hiddenText + ' ';
    }

    return (
        <div className="line">
            <p>{line.words.map((word, key) => renderWord(word, key))}</p>
        </div>
    );
}

export default LineContainer;