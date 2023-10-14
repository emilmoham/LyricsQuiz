import { isNotAlphaNumeric } from '../constants'

export function convertToLogicalWord(input) {
    return input.toLowerCase().replace(isNotAlphaNumeric, '');
}