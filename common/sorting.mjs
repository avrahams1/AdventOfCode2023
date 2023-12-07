/**
 * @param {T[]} array
 * @param {((a: T, b: T) => number)} sortMethod
 * @returns {T[]}
 * @template T
 */
export default function sortArray(array, sortMethod) {
    array.sort(sortMethod);
    return array;
}