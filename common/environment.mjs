import sortArray from "./sorting.mjs";

/**
 * 
 * @param {((a: T, b: T) => number)} sortMethod 
 * @returns {T[]}
 * @template T
 */
Array.prototype.sortAndReturn = function(sortMethod) {
    return sortArray(this, sortMethod)
}