export default class Point {
    /**
     * 
     * @param {number} i 
     * @param {number} j 
     */
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    /**
     * 
     * @param {T[][]} matrix 
     * @returns {Point[]}
     * @template T
     */
    getPointsAround(matrix) {
        const pointsAround = [];
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (!this.inRange(new Point(i, j))) continue;

                pointsAround.push(new Point(i, j));
            }
        }

        return pointsAround;
    }

    /**
     * 
     * @param {number} iOffset 
     * @param {number} jOffset 
     * @returns {Point}
     */
    withOffset(iOffset, jOffset) {
        return new Point(this.i + iOffset, this.j + jOffset);
    }

    /**
     * 
     * @param {T[][]} matrix 
     * @returns {boolean}
     * @param {Point?} point 
     * @template T
     */
    inRange(matrix, point = null) {
        const { i, j } = point || this;
        
        return i >= 0 && j >= 0 &&
            i < matrix.length &&
            j < matrix[i].length;
    }

    /**
     * 
     * @returns {string}
     */
    toIdString() {
        return `${this.i},${this.j}`;
    }
}