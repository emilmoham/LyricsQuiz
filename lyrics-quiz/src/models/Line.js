import { isGeniusSectionHeader } from "../constants";
import { Word } from "./Word";

export const Line = (input) => {
    const words = [];
    
    const isSectionHeader = input.match(isGeniusSectionHeader) !== null;

    input.split(' ').forEach((word) => {
        words.push(Word(word, isSectionHeader))
    });
    
    return {
        isSectionHeader: isSectionHeader,
        words: words
    }
}