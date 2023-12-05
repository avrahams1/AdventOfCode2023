/**
 * Parse multi line input into trimmed lines, ignoring empty ones.
 * @param {string} input 
 */
export function parseLines(input) {
    return splitStringAndFilterEmpties(input, '\n');
}

/**
 * Parse a string number list
 * @param {string} numberListString 
 * @returns {number[]}
 */
export function parseNumberList(numberListString) {
    return splitStringAndFilterEmpties(numberListString, ' ')
        .map(num => +num);
}

/**
 * 
 * @param {string} str 
 * @param {string} splitString 
 * @returns {string}
 */
function splitStringAndFilterEmpties(str, splitString) {
    return str
        .split(splitString)
        .filter(num => num && num.trim())
        .map(num => num.trim())
}