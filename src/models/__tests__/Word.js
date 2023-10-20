import { Word } from '../Word';

// Non section headers, no separation characters
test.each([
  [
    'Word',
    {
      revealedText: 'Word',
      hiddenText: '____',
      logicalText: 'word',
      separator: ''
    }
  ],
  [
    '(Parenthetical)',
    {
      revealedText: '(Parenthetical)',
      hiddenText: '(_____________)',
      logicalText: 'parenthetical',
      separator: ''
    }
  ],
  [
    'lingüístico',
    {
      revealedText: 'lingüístico',
      hiddenText: '___________',
      logicalText: 'linguistico',
      separator: ''
    }
  ],
  [
    '365',
    {
      revealedText: '365',
      hiddenText: '___',
      logicalText: '365',
      separator: ''
    }
  ]
])('Word_Blank_Separator', (input, output) => {
  expect(Word(input, '', false)).toEqual(output);
});

// Non section headers, with separation charachters
test.each([
  [
    { text: 'Word', separator: '-' },
    {
      revealedText: 'Word',
      hiddenText: '____',
      logicalText: 'word',
      separator: '-'
    }
  ],
  [
    { text: '(Parenthetical)', separator: ' ' },
    {
      revealedText: '(Parenthetical)',
      hiddenText: '(_____________)',
      logicalText: 'parenthetical',
      separator: ' '
    }
  ],
  [
    { text: 'lingüístico', separator: '-' },
    {
      revealedText: 'lingüístico',
      hiddenText: '___________',
      logicalText: 'linguistico',
      separator: '-'
    }
  ],
  [
    { text: '365', separator: '-' },
    {
      revealedText: '365',
      hiddenText: '___',
      logicalText: '365',
      separator: '-'
    }
  ]
])('Word_With_Separator', (input, output) => {
  expect(Word(input.text, input.separator, false)).toEqual(output);
});

// Section Headers
test.each([
  [
    '[Word]',
    {
      revealedText: '[Word]',
      hiddenText: '[Word]',
      logicalText: '[Word]',
      separator: ''
    }
  ],
  [
    '[Multiple Words]',
    {
      revealedText: '[Multiple Words]',
      hiddenText: '[Multiple Words]',
      logicalText: '[Multiple Words]',
      separator: ''
    }
  ]
])('Word_Section_Header', (input, output) => {
  expect(Word(input, '', true)).toEqual(output);
});
