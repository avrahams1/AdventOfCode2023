/**
 * Enum for EntityType
 * @readonly
 * @enum {string}
 */
export const Direction = {
    R: 'right',
    L: 'left'
};

/**
 * 
 * @param {string} fromChar 
 * @returns {Direction}
 */
export function parseDirection(fromChar) {
    return Direction[fromChar];
}