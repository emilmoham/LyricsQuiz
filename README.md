# Lyrics Quiz

Oh you like that song? Name every word they say in it.

This repository contains the code for the front end of my
[Lyrics Quiz](https://lyricsquiz.emilmoham.io) website.

## Environment Requirements

- Node >= 20.10.0

## Development Set Up

This project depends on an
[API project](https://github.com/emilmoham/LyricsQuizAPI) to retrieve lyrics
and song metadata from [Lrclib.net](https://lrclib.net/). A docker compose file
which runs the API locally has been included for convenience. Mock data has also
been provided to be used in development and therefore it is **not required** to
run the API project when working on this project.

For instructions on how to use the mock data see the
[Using Mock Data](#using-mock-data) section.

For instructions on how to set up the API project see
[here](https://github.com/emilmoham/LyricsQuizAPI).

If you are using working on this project and would like to use
the API in development, you must provide a valid proxy link in `package.json`.
If you're running the API locally, adjust the `proxy` setting in `package.json`
to the use the host and port the API is avaiable on.

```json
// package.json
  ...
  "proxy": "http://localhost:8011",
  ...
```

The above configuration represents a development environment which is running
the API project with default settings, locally.

Alternatively you may wish to use the live version of the API: `https://lyricsapi.emilmoham.io`

```shell
# 1. Clone the repository
git clone https://github.com/emilmoham/LyricsQuiz.git

# 2. Run npm install
npm i

# 3. (Optional) Run the API locally with docker
docker compose up -d

# 4. Start the development server
npm run start
```

### Using Mock Data

Mock data has been provided as an alternative to the API.

#### Mock Song Data

The mock song data can be used by editing the
[useGameData](./src/hooks/useGameData) hook with the following code:

```js
// At the top of the file add an import for the mock data
...
import { mockData } from '../mockData';
...

// In the loadSong function set the raw data state variable to the mockData
// and return early
function loadSong(song) {
  setRawData(mockData);
  return;
  ...
}
...
```

#### Mock Search Data

The mock search data can be used by editing the
[SearchBar](./src/components/SearchBar/SearchBar.jsx) component.

```js
...
// At the top of the file add an import for the mock search data
import { mockSearch } from '../../mockSearch';
...

// In the handleSearch callback function, set the options State to the mock data
// with the following code:
const handleSearch = useCallback(
  (query, accept) => {
    if (query === undefined || query === null || typeof query !== 'string') {
      return [];
    }

    query = query.trim();
    if (query.length === 0) return [];

    let newOptions = [];
    if (value) {
      newOptions = [value];
    }

    newOptions = [...newOptions, ...mockSearch];
    setOptions(newOptions);
    return;
    ...
  }, [...]);
...
```
