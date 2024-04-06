import { arithmeticSeriesSum } from "../common/Math.mjs";

export class Segment {
    /**
     * 
     * @param {number} startIndex 
     */
    constructor(startIndex) {
        this.startIndex = startIndex;
        this.numOfRocks = 0;
    }

    addRock() {
        this.numOfRocks++;
    }

    isEmpty() {
        return !this.numOfRocks;
    }

    /**
     * @returns {number}
     */
    score() {
        const a1 = this.startIndex - this.numOfRocks + 1;
        const aN = this.startIndex;
        const n = this.numOfRocks;

        return arithmeticSeriesSum(a1, aN, n);
    }
}