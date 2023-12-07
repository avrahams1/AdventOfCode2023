/**
 * Enum for EntityType
 * @readonly
 * @enum {number}
 */
export const Card = {
    J: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    T: 9,
    Q: 10,
    K: 11,
    A: 12
};

/**
 * 
 * @param {string} fromString 
 * @returns {Card}
 */
export function parseCard(fromString) {
    return Card[fromString]
}