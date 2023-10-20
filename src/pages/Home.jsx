import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidGeniusUrl } from '../constants';

function Home() {
  const navigate = useNavigate();

  const inputRef = useRef();
  const [showValidationError, setShowValidationError] = useState(false);

  const onClickBegin = () => {
    const input = inputRef.current.value.trim();
    const matches = isValidGeniusUrl.exec(input);

    if (matches === null || matches.length !== 2) setShowValidationError(true);
    else {
      navigate(`/${matches[1]}`);
    }
  };

  return (
    <div className='home-main-container'>
      <div className='begin-quiz-form'>
        <h1>Weclome to Lyric Quiz</h1>
        <h3>
          Copy the URL for a song from{' '}
          <a href='https://genius.com' target='_blank' rel='noreferrer'>
            Genius.com
          </a>
        </h3>
        <input ref={inputRef} placeholder='Paste the URL here: (i.e. https://genius.com/The-champs-tequila-lyric)' />
        {showValidationError && (
          <div className='validation-error-container'>
            That URL doesn&apost look right, please check it and try again
          </div>
        )}
        <button onClick={onClickBegin}>Generate your quiz</button>
      </div>
    </div>
  );
}

export default Home;
