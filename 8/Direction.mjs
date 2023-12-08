/**
 * Enum for EntityType
 * @readonly
 * @enum {number}
 */
export const Direction = {
    R: 0,
    L: 1
};

/**
 * 
 * @param {string} fromChar 
 * @returns {Direction}
 */
export function parseDirection(fromChar) {
    return Direction[fromChar];
}