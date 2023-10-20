import { convertToLogicalWord, removeDiacritics } from './Helpers';
import { isAlphaNumeric } from "../constants";

export function Word(input, separationCharacter, isSectionHeader) {
    const revealedText = input;

    let separator = separationCharacter === undefined ? '' : separationCharacter;
    let hiddenText = '';
    let logicalText = '';
    
    if (isSectionHeader) {
        hiddenText = input;
        logicalText = input;
    } else {
        hiddenText = removeDiacritics(input).replace(isAlphaNumeric, '_');
        logicalText = convertToLogicalWord(input);
    }
    
    return {
        revealedText: revealedText,
        hiddenText: hiddenText,
        logicalText: logicalText,
        separator: separator,
    }
}