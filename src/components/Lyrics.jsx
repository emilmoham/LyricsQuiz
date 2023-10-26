import React from 'react';
import PropTypes from 'prop-types';
import LineContainer from './LineContainer';

const Lyrics = (props) => {
  const { lyrics, answerMap, gameEndTimestamp } = props;

  const renderSectionHeader = (words) => {
    let output = '';
    for (let i = 0; i < words.length; i++) {
      output += words[i].revealedText + ' ';
    }
    return output;
  };

  return (
    <div className='lyrics-container'>
      {lyrics.map((line, index) => {
        if (line.isSectionHeader) {
          return <h4 key={index}>{renderSectionHeader(line.words)}</h4>;
        }
        return (
          <LineContainer
            key={index}
            line={line}
            revealedWords={answerMap}
            isGameOver={gameEndTimestamp !== null}
          />
        );
      })}
    </div>
  );
};

Lyrics.propTypes = {
  lyrics: PropTypes.array,
  answerMap: PropTypes.objectOf(Map),
  gameEndTimestamp: PropTypes.objectOf(Date)
};

export default Lyrics;
