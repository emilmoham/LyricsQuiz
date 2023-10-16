import { convertToLogicalWord } from "../Helpers";

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