import input from "./input.mjs";
import EntityType, { entityTypeFromString } from "./EntityType.mjs";
import Database from "./Database.mjs";
import { parseLines, parseNumberList } from '../common/parsing.mjs';

const database = ((input) => {
    const db = new Database();
    const lines = parseLines(input);
    let sourceType = null, destType = null;
    
    for (const line of lines) {
        let match;

        if (line.match(/seeds:(\s+\d+)+/g)) {
            const numbersStartIndex = line.indexOf(':') + 2;
            db.addSeeds(...parseNumberList(line.substring(numbersStartIndex)));
        } else if (match = line.match(/(?<sourceType>[a-z]+)-to-(?<destType>[a-z]+) map:/)) {
            const { sourceType: sourceTypeStr, destType: destTypeStr } = match.groups;
            sourceType = entityTypeFromString(sourceTypeStr);
            destType = entityTypeFromString(destTypeStr);
        } else if (line.match(/^(\s*\d+)+$/)) {
            const [ destRangeStart, sourceRangeStart, rangeLength ] = parseNumberList(line);
            db.addMapping(sourceType, destType, sourceRangeStart, destRangeStart, rangeLength);
        }
    }

    return db;
})(input);

let minLocation = Number.MAX_SAFE_INTEGER;
for (const seed of database.seeds) {
    const soil = database.getMapping(EntityType.Seed, EntityType.Soil, seed);
    const fertilizer = database.getMapping(EntityType.Soil, EntityType.Fertilizer, soil);
    const water = database.getMapping(EntityType.Fertilizer, EntityType.Water, fertilizer);
    const light = database.getMapping(EntityType.Water, EntityType.Light, water);
    const temperature = database.getMapping(EntityType.Light, EntityType.Temperature, light);
    const humidity = database.getMapping(EntityType.Temperature, EntityType.Humidity, temperature);
    const location = database.getMapping(EntityType.Humidity, EntityType.Location, humidity);

    if (location < minLocation) {
        minLocation = location;
    }
}

console.log(minLocation);