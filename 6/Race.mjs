export default class Race {
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
        const calculator = getZeroPointCalculator(this.time, this.distance);
        const answer = calculator(true) - calculator(false) + 1;
        return answer;
    }
}

/**
 * 
 * @param {number} time 
 * @param {number} distance 
 */
function getZeroPointCalculator(time, distance) {
    /**
     * @param {boolean} isHigh 
     */
    return isHigh => {
        const sqrt = Math.sqrt(time * time - 4 * distance) * (isHigh ? 1 : -1);
        const answer = (time + sqrt) / 2;

        if (Number.isInteger(answer)) {
            return answer - (isHigh ? 1 : -1);
        } else {
            return isHigh ? Math.floor(answer) : Math.ceil(answer);
        }
    }
}