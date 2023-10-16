import { isNotAlphaNumeric } from '../constants'

export function convertToLogicalWord(input) {
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return input.toLowerCase().replace(isNotAlphaNumeric, '');
}