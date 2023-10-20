import React from 'react';
import LineContainer from './LineContainer';

const Lyrics = (props) => {
  const { gameData } = props;

  const renderSectionHeader = (words) => {
    let output = '';
    for (let i = 0; i < words.length; i++) {
      output += words[i].revealedText + ' ';
    }
    return output;
  };

  return (
    <div className="lyrics-container">
      {gameData.lyrics.map((line, index) => {
        if (line.isSectionHeader) {
          return <h4 key={index}>{renderSectionHeader(line.words)}</h4>;
        }
        return (
          <LineContainer
            key={index}
            line={line}
            revealedWords={gameData.answerMap}
            isGameOver={gameData.isGameOver}
          />
        );
      })}
    </div>
  );
};

export default Lyrics;
