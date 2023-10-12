import React from "react";

import LineContainer from './LineContainer';

const Lyrics = (props) => {
    const {
        gameData,
    } = props;

    return (
    <div className='lyrics-container'>
        {gameData.lyrics.map((line, index) => {
          if (line.isSectionHeader) {
            return (<h4>{line.words.map((word) => {return word.revealedText + ' '})}</h4>)
          }
          return (
            <LineContainer key={index} line={line} revealedWords={gameData.answerMap} isGameOver={gameData.isGameOver} />
          );
        })}
    </div>
    );
}

export default Lyrics;