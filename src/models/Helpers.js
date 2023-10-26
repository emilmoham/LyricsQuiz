import { isNotAlphaNumeric } from '../constants';

export function removeDiacritics(input) {
  return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function convertToLogicalWord(input) {
  return removeDiacritics(input).toLowerCase().replace(isNotAlphaNumeric, '');
}
