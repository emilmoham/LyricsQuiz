import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function Home() {
  const navigate = useNavigate();

  const [value, setValue] = useState(null);

  const onClickBegin = useCallback(() => {
    if (!value) return;
    navigate(value.result.path);
  }, [value, navigate]);

  return (
    <div className='launcher'>
      <div className='launcher__form'>
        <h1>
          Welcome to <span className='launcher__title'>Lyrics Quiz</span>
        </h1>
        <SearchBar value={value} setValue={setValue} />
        <button
          className='launcher__button launcher__button--hoverable'
          onClick={onClickBegin}
        >
          Generate your quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
