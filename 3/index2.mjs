import input from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";
import GeneralSet from "../common/GeneralSet.mjs";

const CellType = {
    Empty: Symbol("CellType-Empty"),
    Number: Symbol("CellType-Number"),
    Gear: Symbol("CellType-Gear")
};

class Cell {
    constructor(char, i, j) {
        const charAsNum = +char;
        if (!isNaN(charAsNum)) {
            this.num = charAsNum;
            this.type = CellType.Number;
        } else if (char === '*') {
            this.type = CellType.Gear;
        } else {
            this.type = CellType.Empty;
        }

        this.point = new Point(i, j);
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

        this.append(initialCell);
    }

    append(cell) {
        this.value = (this.value * 10) + cell.num;
        return this;
    }
}

class Point {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.idString = `${i},${j}`;
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

    getCell(matrix) {
        return matrix[this.i][this.j];
    }

    toIdString() {
        return this.idString;
    }
}

class Solver {
    constructor(input) {
        this.matrix = parseLines(input)
            .reduce((mat, line) => {
                mat.push([...line].map((char, idx) => new Cell(char, mat.length, idx)));
                return mat;
            }, [])
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
        if (cell.type !== CellType.Gear) {
            return;
        }

        const pointsAround = cell.point.getPointsAround(this.matrix);
        const numberStartPoints = pointsAround.reduce((set, point) => {
            const cell = point.getCell(this.matrix);

            if (cell.type === CellType.Number) {
                let j;
                for (j = point.j; j >= 0; j--) {
                    const currCell = new Point(point.i, j).getCell(this.matrix);
                    if (currCell.type !== CellType.Number) break;
                }

                set.add(new Point(point.i, j + 1));
            }

            return set;
        }, new GeneralSet())

        if (numberStartPoints.length !== 2) {
            return;
        }

        const points = [...numberStartPoints.values()];
        this.sum += this.accumulateNumber(points[0]) * this.accumulateNumber(points[1]);
    }
    
    accumulateNumber(fromPoint) {
        const acc = new Accumulator(fromPoint.getCell(this.matrix));

        for (let j = fromPoint.j + 1; j < this.matrix[fromPoint.i].length; j++) {
            const cell = new Point(fromPoint.i, j).getCell(this.matrix);

            if (cell.type !== CellType.Number) {
                break;
            }

            acc.append(cell);
        }

        return acc.value;
    }
}

const solver = new Solver(input);
console.log(solver.solve());