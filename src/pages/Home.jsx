import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

function Home() {
  const navigate = useNavigate();

  const [song, setSong] = useState(null);
  const [timed, setTimed] = useState(true);

  const onClickBegin = useCallback(() => {
    if (!song) return;
    navigate({
      pathname: song.result.path,
      search: `?timed=${timed}`
    });
  }, [song, navigate]);

  const handleChangeTiming = (event) => {
    setTimed(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <div className='launcher'>
      <div className='launcher__form'>
        <h1>Lyrics Quiz</h1>
        <SearchBar value={song} setValue={setSong} />
        <FormGroup>
          <FormControlLabel
            sx={{
              paddingTop: 1
            }}
            control={
              <Switch
                checked={timed}
                onChange={handleChangeTiming}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    '&.Mui-checked': {
                      color: '#fff',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#6638eb'
                      }
                    }
                  }
                }}
              />
            }
            label='Timed'
          />
        </FormGroup>
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
