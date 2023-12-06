import input from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";

/*
maxTime
distance

1 * (maxTime - 1)
2 * (maxTime - 2)
...
(maxTime - 2) * 2
(maxTime - 1)

7: 1-6, 2-5,3-4
9: 1-8,2-7,3-6,4-5
10: 1-9,2-8,3-7;6-4,5-5
buttonHolding = 1...time/2

for odd time, multiply each hit by 2
for even time, the last one (5-5 for 10) is unique, all others multiply by 2
*/

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
        let counter = 0;

        for (let i = 1; i <= this.time / 2; i++) {
            if (i * (this.time - i) > this.distance) {
                counter += (this.time % 2 == 0 && i === this.time / 2) ? 1 : 2;
            }
        }

        return counter;
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