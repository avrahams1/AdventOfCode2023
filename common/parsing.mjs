/**
 * Parse multi line input into trimmed lines, ignoring empty ones.
 * @param {string} input 
 */
export function parseLines(input, filterEmptyLines = true) {
    return splitStringAndFilterEmpties(input.trim(), '\n', filterEmptyLines);
}

/**
 * Parse a string number list
 * @param {string} numberListString 
 * @param {string?} afterSubstring 
 * @returns {number[]}
 */
export function parseNumberList(numberListString, afterSubstring = null) {
    if (afterSubstring) {
        const index = numberListString.indexOf(afterSubstring);
        numberListString = numberListString.substring(index + afterSubstring.length);
    }

    return splitStringAndFilterEmpties(numberListString, ' ')
        .map(num => +num);
}

/**
 * 
 * @param {string} str 
 * @param {string} splitString 
 * @returns {string[]}
 */
function splitStringAndFilterEmpties(str, splitString, filterEmptyLines = true) {
    return str
        .split(splitString)
        .filter(str => !filterEmptyLines || (str && str.trim()))
        .map(str => str.trim())
}