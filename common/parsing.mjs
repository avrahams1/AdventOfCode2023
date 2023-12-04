/**
 * Parse multi line input into trimmed lines, ignoring empty ones.
 * @param {string} input 
 */
export function parseLines(input) {
    return input
        .split("\n")
        .filter(line => line)
        .map(line => line.trim())
}

/**
 * Parse a string number list
 * @param {string} numberListString 
 * @returns {number[]}
 */
export function parseNumberList(numberListString) {
    return numberListString
        .split(' ')
        .filter(num => num && num.trim())
        .map(num => num.trim())
        .map(num => +num);
}