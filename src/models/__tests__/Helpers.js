import { convertToLogicalWord, removeDiacritics } from "../Helpers";

test.each([
    ['Word', 'Word'],
    ['Emil\'s', 'Emil\'s'],
    ['!@#$%^&*()[]{}', '!@#$%^&*()[]{}'],
    ['1234', '1234'],
    ['Mañana', 'Manana'],
    ['Lingüístico', 'Linguistico'],
])('removeDiacritics', (input, output) => {
    expect (removeDiacritics(input)).toBe(output);
})

test.each([
    ['Word', 'word'],
    ['word', 'word'],
    ['5', '5'],
    ['A', 'a'],
    ['é', 'e'],
    ['Mañana', 'manana'],
])('convertToLogicalWord', (input, output) => {
    expect(convertToLogicalWord(input)).toStrictEqual(output);
});