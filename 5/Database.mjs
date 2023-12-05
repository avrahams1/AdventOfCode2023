import EntityType from "./EntityType.mjs";

export default class Database {
    constructor() {
        /**
         * Seed numbers
         * @type {number[]}
         */
        this.seeds = [];

        /**
         * source type -> destination type -> source id -> dest id
         * @type {Map<EntityType, Map<EntityType, MappingRule[]>>}
         */
        this.maps = new Map()
    }

     /**
     * Add seeds
     * @param {number[]} seeds
     */
     addSeeds(...seeds) {
        this.seeds.push(...seeds);
    }

    /**
     * Add a mapping
     * @param {EntityType} sourceType
     * @param {EntityType} destinationType 
     * @param {number} sourceRangeStart 
     * @param {number} destRangeStart 
     * @param {rangeLength} destRangeStart 
     */
    addMapping(sourceType, destinationType, sourceRangeStart, destRangeStart, rangeLength) {
        const sourceMap = getOrAddInternalMap(this.maps, sourceType);
        
        if (!sourceMap.has(destinationType)) {
            sourceMap.set(destinationType, []);
        }

        sourceMap.get(destinationType).push(new MappingRule(sourceRangeStart, destRangeStart, rangeLength));
    }

    /**
     * Get a mapping
     * @param {EntityType} sourceType
     * @param {EntityType} destinationType 
     * @param {number} sourceId 
     * @returns {number|undefined}
     */
    getMapping(sourceType, destinationType, sourceId) {
        const rules = this.maps.get(sourceType)?.get(destinationType);

        if (!rules || rules.length === 0) {
            return sourceId; // if mapping is missing, destId = sourceId
        }

        const rule = rules.find(rule => rule.isInRange(sourceId));

        if (!rule) {
            return sourceId; // if mapping is missing, destId = sourceId
        }

        return rule.translate(sourceId);
    }
}

/**
 * Get or add internal map
 * @param {Map<T, S>} map 
 * @param {T} key 
 * @returns {S}
 * @template T, S
 */
function getOrAddInternalMap(map, key) {
    if (!map.has(key)) {
        map.set(key, new Map());
    }

    return map.get(key);
}

class MappingRule {
    /**
     * 
     * @param {number} srcStart 
     * @param {number} destStart 
     * @param {number} rangeLength 
     */
    constructor(srcStart, destStart, rangeLength) {
        this.srcStart = srcStart;
        this.srcEnd = srcStart + rangeLength - 1; // inclusive
        this.destStart = destStart;
    }

    isInRange(srcId) {
        return srcId >= this.srcStart && srcId <= this.srcEnd;
    }

    translate(srcId) {
        const offset = srcId - this.srcStart;
        return this.destStart + offset;
    }
}