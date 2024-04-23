import { smallInput } from "./input.mjs";
import { parseLines } from '../common/parsing.mjs';
import { Cell, CellFactory } from "./Cell.mjs";
import GeneralSet from '../common/GeneralSet.mjs';
import Point from '../common/Point.mjs';
import { Direction, LightBeam } from "./LightBeam.mjs";

/**
 * @type {Cell[][]}
 */
const matrix = ((input) => {
    return parseLines(input)
        .reduce((mat, line) => {
            mat.push(line.split('').map(CellFactory));
            return mat;
        }, [])
})(smallInput);

function solve() {
    const visitedPoints = new GeneralSet();
    /**
     * @type {Map<string, LightBeam>}
     */
    const beams = new Map();

    /**
     * 
     * @param {LightBeam} beam 
     */
    function addBeam(beam) {
        beams.set(beam.id, beam);
    }

    addBeam(new LightBeam(0, 0, Direction.East));

    while (beams.size) {
        /**
         * @type {string[]}
         */
        const beamsToRemove = [];
        /**
         * @type {LightBeam[]}
         */
        const beamsToAdd = [];

        print(matrix, beams);

        for (const [id, beam] of beams) {
            visitedPoints.add(beam.point);

            const cell = matrix[beam.point.i][beam.point.j];
            const movementResults = cell.calcMovement(beam.point, beam.direction);
            const validMovements = movementResults.filter(movementResult => movementResult.point.inRange(matrix));

            if (validMovements.length === 0) {
                beamsToRemove.push(id);
            } else if (validMovements.length === 1) {
                const [movementResult] = validMovements;
                beam.point = movementResult.point;
                beam.direction = movementResult.direction;
            } else {
                beamsToRemove.push(id);
                beamsToAdd.push(...validMovements.map(movementResult => 
                    LightBeam.from(movementResult.point, movementResult.direction)));
            }
        }

        for (const idToRemove of beamsToRemove) {
            beams.delete(idToRemove);
        }

        for (const newBeam of beamsToAdd) {
            addBeam(newBeam);
        }
    }

    return visitedPoints.length;
}

console.log(solve());

/**
 * 
 * @param {Cell[][]} matrix 
 * @param {Map<string, LightBeam>} beams 
 */
function print(matrix, beams) {
    console.clear();

    /**
     * @type {Record<Direction, string>}
     */
    const directionToChar = {
        [Direction.North]: '^',
        [Direction.South]: 'v',
        [Direction.East]: '>',
        [Direction.West]: '<'
    };

    const mat = matrix.map(row => row.map(cell => ({
        char: cell.toString(),
        beams: []
    })));

    for (const beam of beams.values()) {
        const {i, j} = beam.point;
        mat[i][j].beams.push(beam);
    }

    let string = "";

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
            const {char, beams} = mat[i][j];

            if (char !== '.') {
                string += char;
                continue;
            }

            switch (beams.length) {
                case 0:
                    string += char;
                    break;
                case 1:
                    string += directionToChar[beams[0].direction]
                    break;
                default:
                    string += beams.length
            }
        }
        
        string += '\n';
    }

    string += '\n';

    console.log(string);
}