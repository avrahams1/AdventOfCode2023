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

    /**
     * @returns {number}
     */
    getScore() {
        return score(this.rows, 100) || score(this.cols);
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

/**
 * 
 * @param {number[]} arr 
 * @param {number} multiplier 
 */
function score(arr, multiplier = 1) {
    /**
     * @type {number}
     */
    let startIndex = null;

    for (let i = 0; i < arr.length - 1; i++) {
        if ((arr[i] === arr[i + 1] && reflectsAllTheWay(arr, i, false)) ||
            (numbersEqualExceptOneBit(arr[i], arr[i + 1]) && reflectsAllTheWay(arr, i, true))) {
            startIndex = i;
            break;
        }
    }

    if (startIndex !== null) {
        return (startIndex + 1) * multiplier;
    }
    
    return 0;
}

/**
 * 
 * @param {number[]} arr 
 * @param {number} index 
 * @param {boolean} didReplaceBit
 * @returns {boolean}
 */
function reflectsAllTheWay(arr, index, didReplaceBit) {
    let firstIndex = index - 1, lastIndex = index + 2;

    for (;firstIndex >= 0 && lastIndex < arr.length;
        firstIndex--, lastIndex++) {
            if (arr[firstIndex] === arr[lastIndex]) {
                continue;
            }
            
            if (didReplaceBit || !numbersEqualExceptOneBit(arr[firstIndex], arr[lastIndex])) {
                break;
            }

            didReplaceBit = true;
        }
    
    return didReplaceBit && (firstIndex === -1 || lastIndex === arr.length);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
function numbersEqualExceptOneBit(x, y) {
    if (x === y) return false;
    
    const xor = x ^ y;
    return (xor & (xor - 1)) === 0;
}