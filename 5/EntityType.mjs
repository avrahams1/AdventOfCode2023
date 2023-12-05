/**
 * Enum for EntityType
 * @readonly
 * @enum {string}
 */
const EntityType = {
    Seed: 'Seed',
    Fertilizer: 'Fertilizer',
    Water: 'Water',
    Light: 'Light',
    Temperature: 'Temperature',
    Humidity: 'Humidity',
    Location: 'Location',
    Soil: 'Soil'
};

/**
 * Parse string to enum
 * @param {string} str 
 * @returns {EntityType}
 */
export function entityTypeFromString(str){
    const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1);
    return EntityType[capitalizedString];
}

export default EntityType;