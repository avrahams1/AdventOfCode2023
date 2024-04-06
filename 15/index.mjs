import { bigInput, smallInput } from "./input.mjs";

const strings = (input => {
    return input.trim().split(',');
})(bigInput);

const sum = strings.reduce((sum, str) => sum + hash(str), 0);
console.log(sum);

/**
 * 
 * @param {string} str 
 */
function hash(str) {
    let curr = 0;

    for (const c of str) {
        curr += c.charCodeAt(0);
        curr *= 17;
        curr %= 256;
    }

    return curr;
}