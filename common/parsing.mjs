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