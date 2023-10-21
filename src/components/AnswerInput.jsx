import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AnswerInput = (props) => {
  const { isGameRunning, checkAnswer } = props;

  const [inputValue, setInputValue] = useState('');

  const onInputChange = (input) => {
    setInputValue(input);
    if (checkAnswer(input)) { setInputValue(''); }
  };

  return (
    <input
      autoFocus
      className='answer-input'
      disabled={!isGameRunning}
      placeholder='Enter Lyrics Here'
      type='text'
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

AnswerInput.propTypes = {
  isGameRunning: PropTypes.bool,
  checkAnswer: PropTypes.func
};

export default AnswerInput;
