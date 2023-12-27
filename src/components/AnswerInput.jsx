import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AnswerInput = (props) => {
  const { isGameRunning, checkAnswer } = props;

  const hiddenInputField = useRef();
  const answerInputField = useRef();

  const [inputValue, setInputValue] = useState('');

  const onInputChange = (input) => {
    setInputValue(input);
    if (checkAnswer(input)) {
      setInputValue('');

      // Clear the auto correct buffer on mobile
      hiddenInputField.current?.focus();
      answerInputField.current?.focus();
    }
  };

  return (
    <>
      <input className='auto-correct-fix' ref={hiddenInputField} />
      <input
        ref={answerInputField}
        autoFocus
        className='answer-input'
        disabled={!isGameRunning}
        placeholder='Enter Lyrics Here'
        type='text'
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </>
  );
};

AnswerInput.propTypes = {
  isGameRunning: PropTypes.bool,
  checkAnswer: PropTypes.func
};

export default AnswerInput;
