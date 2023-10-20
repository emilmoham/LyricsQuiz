import { isAlphaNumeric, isGeniusSectionHeader, isNotAlphaNumeric, isValidGeniusUrl, wordSplice } from '../constants';

// isAlphaNumeric
test.each([
  ['a', true],
  ['A', true],
  ['0', true],
  ['é', false],
  [',', false],
  ['_', false],
  ['-', false],
  [' ', false],
  ['\n', false]
])('isAlphaNumeric', (input, expected) => {
  if (expected) expect(input).toMatch(isAlphaNumeric);
  else expect(input).not.toMatch(isAlphaNumeric);
});

// isNotAlphaNumeric
test.each([
  ['a', false],
  ['A', false],
  ['0', false],
  ['é', true],
  [',', true],
  ['_', true],
  ['-', true],
  [' ', true],
  ['\n', true]
])('isNotAlphaNumeric', (input, expected) => {
  if (expected) expect(input).toMatch(isNotAlphaNumeric);
  else expect(input).not.toMatch(isNotAlphaNumeric);
});

// isGeniusSectionHeader
test.each([
  ['[Chorus]', true],
  ['[With Spaces]', true],
  ['[Verse 1]', true],
  ['{Chorus}', false],
  ['{With Spaces}', false],
  ['{Verse 1}', false],
  ['Normal sentence with many words', false],
  ['Sentence with (parentheticals) and words', false]
  // ['[Sentence] with many words', false]
])('isGeniusSectionHeader', (input, expected) => {
  if (expected) expect(input).toMatch(isGeniusSectionHeader);
  else expect(input).not.toMatch(isGeniusSectionHeader);
});

// isValidGeniusUrl
test.each([
  ['https://genius.com/The-champs-tequila-lyric', true],
  ['https://genius.com/', false],
  ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', false]
])('isValidGeniusUrl', (input, expected) => {
  if (expected) expect(input).toMatch(isValidGeniusUrl);
  else expect(input).not.toMatch(isValidGeniusUrl);
});

// wordSplice
test.each([
  ['', 0],
  ['A', 1],
  ['Multiple words', 2],
  ['Words with (parenthetical-hypenated-words) in the middle', 8],
  ['1 Number', 2],
  ['Sentence with a newline at the end\n', 7]
])('wordSplice', (input, expectedMatchCount) => {
  const matches = [...input.matchAll(wordSplice)];
  expect(matches.length).toStrictEqual(expectedMatchCount);
});
