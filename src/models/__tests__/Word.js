import { Word } from "../Word";

// Non section headers, no separation characters
test.each([
    ['Word', { revealedText: 'Word', hiddenText: '____', logicalText: 'word', separator: '' }],
    ['(Parenthetical)', { revealedText: '(Parenthetical)', hiddenText: '(_____________)', logicalText: 'parenthetical', separator: '' }],
    ['lingüístico', { revealedText: 'lingüístico', hiddenText: '___________', logicalText: 'linguistico', separator: '' }],
    ['365', { revealedText: '365', hiddenText: '___', logicalText: '365', separator: '' }],
])('Word', (input, output) => {
    let word = Word(input, '', false);
    expect(word).toEqual(output);
});