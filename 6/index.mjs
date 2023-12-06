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

const races = ((input) => {
    const [timeRow, distanceRow] = parseLines(input);
    const times = parseNumberList(timeRow, "Time:");
    const distances = parseNumberList(distanceRow, "Distance:");

    return times.map((time, index) => new Race(time, distances[index]));
})(input);

const answer = races.reduce((total, race) => total * race.numOfWinningButtonHoldingTimes(), 1);
console.log(answer);