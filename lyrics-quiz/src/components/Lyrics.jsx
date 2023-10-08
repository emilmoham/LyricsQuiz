import React from "react";

import LineContainer from './LineContainer';

const Lyrics = (props) => {
    const {
        gameData,
    } = props;

    return (
    <div className='lyrics-container'>
        {gameData.lyrics.map((line, index) => {
          return (
            <LineContainer key={index} line={line} revealedWords={gameData.revealedWords} />
          );
        })}
    </div>
    );
}

export default Lyrics;