import { Line } from './Line';
//import { mockData } from '../mockData';
import { convertToLogicalWord, getCurrentScore } from './Helpers';

export function initializeGameData (response) {
    let title = 'Loading';
    let lyrics = [];
    let answerMap = new Map();
    let maxScore = 0;

    const createSanitizeLyricsSet = (rawLyrics) => {
        let finalLineSet = [];
        let rawLineSet = rawLyrics.split('\n');
        for(let i = 0; i < rawLineSet.length; i++) {
            let line = rawLineSet[i];
            if (line.length !== 0)
            {
                const current = Line(line);
                finalLineSet.push(current);
            }
        }
        return finalLineSet;
    }

    const initializeAnswerMap = (lineSet) => {
        const myMap = new Map()
        for(let i = 0; i < lineSet.length; i++) {
            let line = lineSet[i];
            
            if (line.isSectionHeader)
                continue;
    
            for (let j = 0; j < line.words.length; j++) {
                let word = line.words[j].logicalText;
                if (myMap.get(word) === undefined)
                    myMap.set(word, false);
            }
        }
        return myMap;
    }

    const getMaximumPossibleScore = (lyricSet) => {
        let maxPossibleScore = 0;
        for(let i = 0; i < lyricSet.length; i++) {
            let line = lyricSet[i];
            if (!line.isSectionHeader) {
                maxPossibleScore += line.words.length;
            }
        }
        return maxPossibleScore;
    }

    
    if (response) {
        title = response.data.title;
        lyrics = createSanitizeLyricsSet(response.data.lyrics);
        answerMap = initializeAnswerMap(lyrics);
    }

    return {
        title: title,
        lyrics: lyrics,
        answerMap: answerMap,
        currentScore: 0,
        maxPossibleScore: getMaximumPossibleScore(lyrics),
        isGameOver: false,
        startTimestamp: null,
        endTimestamp: null,
        gameRunning: false,
        allowedGameSeconds: 480
    }
}

export function createGameDataCallbacks(setData) {
    return {
        checkAnswer: (key) => {
            const logicalWord = convertToLogicalWord(key);
            setData((prevData) => {
                if (prevData.answerMap.get(logicalWord) === false) {
                    const newAnswerMap = new Map(prevData.answerMap);
                    newAnswerMap.set(logicalWord, true);

                    // There must be a better way to do this
                    let newScore = 0;

                    for (let i = 0; i < prevData.lyrics.length; i++) {
                        let line = prevData.lyrics[i];
                        if (!line.isSectionHeader) {
                            line.words.map((word) => {
                                newScore += newAnswerMap.get(word.logicalText);
                            })
                        }
                    }

                    return {...prevData, currentScore: newScore, answerMap: newAnswerMap}
                }
            });
        },
        startGame: () => {
            setData((prevData) => {
                return {...prevData, gameRunning: true, startTimestamp: new Date()}
            });
        },
        endGame: () => {
            setData((prevData) => {
                return {...prevData, gameRunning: false, isGameOver: true, endTimestamp: new Date()}
            });
        }
    }
}