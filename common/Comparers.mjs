/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
export function intComparer(a, b) {
    const result = a - b;
    return result ? (result < 0 ? -1 : 1) : 0
}