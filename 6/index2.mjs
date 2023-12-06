import input from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";

class Race {
    /**
     * ctor
     * @param {number} time 
     * @param {number} distance 
     */
    constructor(time, distance) {
        this.time = time;
        this.distance = distance;
    }

    numOfWinningButtonHoldingTimes() {
        let firstNumberThatWorks;
        for (firstNumberThatWorks = 1; firstNumberThatWorks <= this.time / 2; firstNumberThatWorks++) {
            if (firstNumberThatWorks * (this.time - firstNumberThatWorks) > this.distance) {
                break;
            }
        }

        const isEvenTime = this.time % 2 == 0;
        return ((Math.floor(this.time / 2) - firstNumberThatWorks + 1) * 2 - (isEvenTime ? 1 : 0));
    }
}

const race = ((input) => {
    const [timeRow, distanceRow] = parseLines(input);
    const times = parseNumberList(timeRow, "Time:");
    const distances = parseNumberList(distanceRow, "Distance:");

    const unifiedTime = +times.join('');
    const unifiedDistance = +distances.join('');
    return new Race(unifiedTime, unifiedDistance);
})(input);

console.log(race.numOfWinningButtonHoldingTimes());