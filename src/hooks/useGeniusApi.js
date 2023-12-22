import axios from 'axios';

function useGeniusApi() {
  function search(query) {
    if (query === undefined || query === null) return [];
    const encodedQuery = encodeURIComponent(query);
    return axios.get(
      `${process.env.REACT_APP_LYRICS_QUIZ_API_HOST}/Genius/search?q=${encodedQuery}`
    );
  }

  return {
    search
  };
}

export default useGeniusApi;
