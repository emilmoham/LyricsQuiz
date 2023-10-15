import { isAlphaNumeric, isNotAlphaNumeric } from "../constants"

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
    ['\n',false],
])('isAlphaNumeric', (input, expected) => {
    if (expected) 
        expect(input).toMatch(isAlphaNumeric);
    else
        expect(input).not.toMatch(isAlphaNumeric);
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
    ['\n',true],
])('isAlphaNumeric', (input, expected) => {
    if (expected) 
        expect(input).toMatch(isNotAlphaNumeric);
    else
        expect(input).not.toMatch(isNotAlphaNumeric);
});