import React from 'react';
import PropTypes from 'prop-types';

const LineContainer = (props) => {
  const { line, revealedWords, isGameOver } = props;

  const renderWord = (word, key) => {
    if (revealedWords.get(word.logicalText)) {
      return word.revealedText + word.separator;
    }

    if (isGameOver) {
      return (
        <span key={key} className='missed-word'>
          {word.revealedText + word.separator}
        </span>
      );
    }

    return word.hiddenText + word.separator;
  };

  return (
    <div className='line'>
      <p>{line.words.map((word, key) => renderWord(word, key))}</p>
    </div>
  );
};

LineContainer.propTypes = {
  line: PropTypes.arrayOf(PropTypes.object),
  revealedWords: PropTypes.objectOf(Map),
  isGameOver: PropTypes.bool
};

export default LineContainer;
