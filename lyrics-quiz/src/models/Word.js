import { convertToLogicalWord } from './Helpers';
import { isAlphaNumeric, isGeniusSectionHeader } from "../constants";

export const Word = (input, isSectionHeader) => {
    const revealedText = input;

    let hiddenText = '';
    let logicalText = '';
    
    if (isSectionHeader) {
        hiddenText = input;
        logicalText = input;
    } else {
        hiddenText = input.replace(isAlphaNumeric, '_');
        logicalText = convertToLogicalWord(input);
    }
    
    return {
        revealedText: revealedText,
        hiddenText: hiddenText,
        logicalText: logicalText,
    }
}