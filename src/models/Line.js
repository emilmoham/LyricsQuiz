import { isGeniusSectionHeader, wordSplice } from "../constants";
import { Word } from "./Word";

export const Line = (input) => {
    const words = [];
    
    const isSectionHeader = input.match(isGeniusSectionHeader) !== null;

    if (isSectionHeader) {
        words.push(Word(input, '', isSectionHeader));
        
    } else {
        
        let matchArr = [...input.matchAll(wordSplice)];
        matchArr.map((matchSet) => {
            words.push(Word(matchSet[1], matchSet[2], isSectionHeader));
        });
    }

    return {
        isSectionHeader: isSectionHeader,
        words: words
    }
}