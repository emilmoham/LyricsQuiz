import { Line } from '../Line';

// Normal lyrics
test.each([
  ['A regular line of lyrics', { expectedWords: 5, isSectionHeader: false }],
  ['A line with-hyphenated-words', { expectedWords: 5, isSectionHeader: false }],
  ['A line with (words inside parenthesis)', { expectedWords: 6, isSectionHeader: false }],
  ['[Verse 1]', { expectedWords: 1, isSectionHeader: true }]
])('Line_Normal_Lyrics', (input, output) => {
  const line = Line(input);
  expect(line.isSectionHeader).toBe(output.isSectionHeader);
  expect(line.words.length).toBe(output.expectedWords);
});

// Section Headers
test.each([
  ['[Chorus]', true],
  ['[Pre-Chorus]', true],
  ['[Verse 1]', true],
  ['{Strange Brackets}', false],
  ['(Parenthetical)', false],
  ['Regular Words', false]
])('Line_Section_Header', (input, output) => {
  expect(Line(input).isSectionHeader).toBe(output);
});
