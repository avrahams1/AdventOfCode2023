import input from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";
import GeneralSet from "../common/GeneralSet.mjs";

const CellType = {
    Empty: Symbol("CellType-Empty"),
    Number: Symbol("CellType-Number"),
    Symbol: Symbol("CellType-Symbol")
};

class Cell {
    constructor(char, i, j) {
        const charAsNum = +char;
        if (!isNaN(charAsNum)) {
            this.num = charAsNum;
            this.type = CellType.Number;
        } else if (char === '.') {
            this.type = CellType.Empty;
        } else {
            this.type = CellType.Symbol;
        }

        this.i = i;
        this.j = j;
    }

    createAccumulator() {
        if (this.type !== CellType.Number) {
            return null;
        }

        return new Accumulator(this);
    }
}

class Accumulator {
    constructor(initialCell) {
        this.value = 0;
        this.coordinates = [];

        this.append(initialCell);
    }

    append(cell) {
        this.value = (this.value * 10) + cell.num;
        this.coordinates.push(new Point(cell.i, cell.j));
        return this;
    }
}

class Point {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    getPointsAround(matrix) {
        const pointsAround = [];
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            if (i < 0 || i >= matrix.length) {
                continue;
            }

            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (j < 0 || j >= matrix[i].length) {
                    continue;
                }

                pointsAround.push(new Point(i, j));
            }
        }

        return pointsAround;
    }

    toIdString() {
        return `${this.i},${this.j}`;
    }
}

class Solver {
    constructor(input) {
        this.matrix = parseLines(input)
            .reduce((mat, line) => {
                mat.push([...line].map((char, idx) => new Cell(char, mat.length, idx)));
                return mat;
            }, [])
        this.accumulator = null;
        this.sum = 0;
    }

    solve() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.handleCell(this.matrix[i][j]);
            }
        }

        return this.sum;
    }

    handleCell(cell) {
        if (cell.type === CellType.Number) {
            this.accumulator = (this.accumulator && this.accumulator.append(cell)) || cell.createAccumulator();
        } else {
            if (this.accumulator) {
                const allSurroundingPoints = this.accumulator.coordinates.flatMap(point => point.getPointsAround(this.matrix));
                const set = new GeneralSet(allSurroundingPoints);
                const hasAjdacentSymbol = [...set].some(point => {
                    const offsetCell = this.matrix[point.i][point.j];
                    return offsetCell.type === CellType.Symbol;
                });

                if (hasAjdacentSymbol) {
                    this.sum += this.accumulator.value;
                }
            }

            this.accumulator = null;
        }
    }
}

const solver = new Solver(input);
console.log(solver.solve());