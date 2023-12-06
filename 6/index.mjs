import input from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";
import Race from "./Race.mjs";

const races = ((input) => {
    const [timeRow, distanceRow] = parseLines(input);
    const times = parseNumberList(timeRow, "Time:");
    const distances = parseNumberList(distanceRow, "Distance:");

    return times.map((time, index) => new Race(time, distances[index]));
})(input);

const answer = races.reduce((total, race) => total * race.numOfWinningButtonHoldingTimes(), 1);
console.log(answer);