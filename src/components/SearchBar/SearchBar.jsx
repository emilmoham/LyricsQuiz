import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, TextField, Autocomplete } from '@mui/material';
import GeniusResult from './GeniusResult';
import axios from 'axios';
// import { mockSearch } from '../../mockSearch';

function SearchBar(props) {
  const { value, setValue } = props;

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = useCallback((event) => {
    setInputValue(event.target.value);
  });

  const debouncedInputChangeHandler = useMemo(
    () => debounce(inputChangeHandler, 300),
    [inputChangeHandler]
  );

  const handleSearch = useCallback(
    (query, accept) => {
      if (query === undefined || query === null || typeof query !== 'string') {
        return [];
      }

      query = query.trim();
      if (query.length === 0) return [];

      // Uncomment to use mock data:
      // let newOptions = [];
      // if (value) {
      //   newOptions = [value];
      // }
      // newOptions = [...newOptions, ...mockSearch];
      // setOptions(newOptions);
      // return;

      const encodedQuery = encodeURIComponent(query);
      axios
        .get(
          `${process.env.REACT_APP_LYRICS_QUIZ_API_HOST}/Genius/search?q=${encodedQuery}`
        )
        .then((response) => {
          if (accept) {
            let newOptions = [];

            if (value) {
              newOptions = [value];
            }

            if (response) {
              newOptions = [...newOptions, ...response.data.response.hits];
            }
            setOptions(newOptions);
          }
        });
    },
    [value, setOptions]
  );

  useEffect(() => {
    let accept = true;

    if (inputValue === '') {
      setOptions([]);
      return;
    }

    handleSearch(inputValue, accept);

    return () => {
      accept = false;
    };
  }, [value, inputValue, setOptions, handleSearch]);

  return (
    <Autocomplete
      id='genius-song-search'
      sx={{
        input: {
          color: '#fff'
        }
      }}
      getOptionLabel={(option) => option.result.full_title}
      filterOptions={(x) => x}
      options={options}
      value={value}
      noOptionsText={
        inputValue?.length === 0 ? 'Search for a song' : 'No matches'
      }
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={debouncedInputChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            style: {
              color: '#fff'
            }
          }}
          label='Search for a song'
          fullWidth
          variant='filled'
        />
      )}
      renderOption={GeniusResult}
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired
};

export default SearchBar;
