import useApiService from "../services/APIService";
import Line from "./Line";
import { mockData } from "../mockData";

const GameData = async (geniusUrl) => {
    const {
        // eslint-disable-next-line
        getGeniusData
    } = useApiService();
    
    let title = "Loading";
    let lyrics = [];
    let revealedWords = new Map();
    
    let response = {}
    //response = await getGeniusData(geniusUrl);
    response.data = mockData;

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

    const createLogicalWordsMap = (lineSet) => {
        let revealedWordsMap = new Map();

        for(let i = 0; i < lineSet.length; i++) {
            let line = lineSet[i];
            
            if (line.isSectionHeader)
                continue;

            for (let j = 0; j < line.words.length; j++) {
                let word = line.words[j].logicalText;
                if (revealedWordsMap.get(word) === undefined)
                    revealedWordsMap.set(word, false);
            }
        }
        
        return revealedWordsMap;
    }

    if (response) {
        title = response.data.title;
        lyrics = createSanitizeLyricsSet(response.data.lyrics);
        revealedWords = createLogicalWordsMap(lyrics);
    }

    return {
        title: title,
        lyrics: lyrics,
        revealedWords: revealedWords
    }
}

export default GameData;