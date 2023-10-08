import { isNotAlphaNumeric } from '../constants'

export const convertToLogicalWord = (input) => {
    return input.toLowerCase().replace(isNotAlphaNumeric, '');
}