import input from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";
import Race from "./Race.mjs";

const race = ((input) => {
    const [timeRow, distanceRow] = parseLines(input);
    const times = parseNumberList(timeRow, "Time:");
    const distances = parseNumberList(distanceRow, "Distance:");

    const unifiedTime = +times.join('');
    const unifiedDistance = +distances.join('');
    return new Race(unifiedTime, unifiedDistance);
})(input);

console.log(race.numOfWinningButtonHoldingTimes());