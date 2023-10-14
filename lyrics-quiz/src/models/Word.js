import { convertToLogicalWord } from './Helpers';
import { isAlphaNumeric } from "../constants";

export const Word = (input, separationCharacter, isSectionHeader) => {
    const revealedText = input;

    let separator = separationCharacter === undefined ? '' : separationCharacter;
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
        separator: separator,
    }
}