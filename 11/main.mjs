import { intComparer } from "../common/Comparers.mjs";
import Point from "../common/Point.mjs";
import { SortedArray } from "../common/SortedArray.mjs";
import { parseLines } from "../common/parsing.mjs";
import { smallInput, bigInput } from "./input.mjs";

const galaxy = ((input) => {
    const lines = parseLines(input);
    const { pointsArray, existingCols, existingRows } = lines
        .reduce(({ pointsArray, existingCols, existingRows }, line, rowIndex) => {
            [...line].forEach((char, colIndex) => {
                if (char === '.') return;
                const name = pointsArray.length ? pointsArray[pointsArray.length - 1].name + 1 : 1;
                pointsArray.push(new Point(rowIndex, colIndex, name));
                existingCols.add(colIndex);
                existingRows.add(rowIndex);
            });

            return { pointsArray, existingRows, existingCols };
        }, { pointsArray: [], existingRows: new Set(), existingCols: new Set() });


        const doubleRows = new SortedArray(intComparer);
        const doubleCols = new SortedArray(intComparer);

        for (let row = 0; row < lines.length; row++) {
            if (existingRows.has(row)) continue;
            doubleRows.insert(row);
        }

        for (let col = 0; col < lines[0].length; col++) {
            if (existingCols.has(col)) continue;
            doubleCols.insert(col);
        }

        return { pointsArray, doubleRows, doubleCols };
})(bigInput);

/**
 * 
 * @param {Point} p1 
 * @param {Point} p2 
 * @returns {Number}
*/
function distance(p1, p2) {
    const { doubleRows, doubleCols } = galaxy;
    const basicDistance = Math.abs(p1.i - p2.i) + Math.abs(p1.j - p2.j);
    const doubleRowsNum = (() => {
        const max = doubleRows.findClosestIndexUnder(Math.max(p1.i, p2.i));
        const min = doubleRows.findClosestIndexOver(Math.min(p1.i, p2.i));

        if (max === null || min === null) {
            return 0;
        }

        return max - min + 1;
    })();

    const doubleColsNum = (() => {
        const max = doubleCols.findClosestIndexUnder(Math.max(p1.j, p2.j));
        const min = doubleCols.findClosestIndexOver(Math.min(p1.j, p2.j));

        if (max === null || min === null) {
            return 0;
        }

        return max - min + 1;
    })();

    return basicDistance + doubleRowsNum + doubleColsNum;
}

let sum = 0;

for (let first = 0; first < galaxy.pointsArray.length; first++) {
    for (let second = first + 1; second < galaxy.pointsArray.length; second++) {
        const d = distance(galaxy.pointsArray[first], galaxy.pointsArray[second]);
        // console.log(`distance between ${galaxy.pointsArray[first].name} and ${galaxy.pointsArray[second].name} is ${d}`);
        sum += d;
    }
}

console.log(sum);
// console.log(distance(new Point(5, 1), new Point(9, 4)));