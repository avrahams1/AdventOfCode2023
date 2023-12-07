/**
 * @param {T[]} array
 * @param {((a: T, b: T) => number)} sortMethod
 * @returns {T[]}
 * @template T
 */
export default function sortArray(array, sortMethod) {
    const copy = [...array];
    copy.sort(sortMethod);
    return copy;
}