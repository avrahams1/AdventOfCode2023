export class Pattern {
    /**
     * 
     * @param {number[]} rows 
     * @param {number[]} cols 
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
}

export class PatternBuilder {
    constructor() {
        /**
         * @type {string[]}
         */
        this.patternMatrix = [];
    }

    /**
     * 
     * @param {string} line 
     * @returns {PatternBuilder}
     */
    appendLine(line) {
        this.patternMatrix.push(line);
        return this;
    }

    /**
     * @returns {Pattern}
     */
    build() {
        const rows = [], cols = [];

        for (const pattern of this.patternMatrix) {
            rows.push(buildNumber(pattern.length, String.prototype.charAt.bind(pattern)))
        }

        const numOfCols = this.patternMatrix[0].length;
        for (let j = 0; j < numOfCols; j++) {
            cols.push(buildNumber(this.patternMatrix.length, i => this.patternMatrix[i].charAt(j)));
        }

        return new Pattern(rows, cols);
    }
}

/**
 * 
 * @param {number} length 
 * @param {(index: number) => string} getCharAt 
 */
function buildNumber(length, getCharAt) {
    let accNum = 0;
    for (let i = 0; i < length; i++) {
        if (getCharAt(i) === '#') {
            accNum |= (1 << i);
        }
    }

    return accNum;
}