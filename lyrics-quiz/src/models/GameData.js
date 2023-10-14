import { Line } from './Line';
//import { mockData } from '../mockData';
import { convertToLogicalWord } from './Helpers';

export function initializeGameData (response) {
    let title = 'Loading';
    let lyrics = [];
    let answerMap = new Map();
    
    //response = await axios.get(``);

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

    const getCurrentScore = (newMap) => {
        let count = 0;
        for (const [key, value] of newMap) {
            if (value) {
                count++;
            }
        }
        return count;
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
        currentScore: getCurrentScore(answerMap),
        maxPossibleScore: answerMap.size,
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
                    return {...prevData, currentScore: prevData.currentScore + 1, answerMap: newAnswerMap}
                }
            });
        },
        startGame: () => {
            setData((prevData) => {
                return {...prevData, gameRunning: true, startTimestamp: new Date()}
            });
        },
        endGame: () => {
            setData((prevData) =>{
                return {...prevData, gameRunning: false, isGameOver: true, endTimestamp: new Date()}
            });
        } 
    }
}