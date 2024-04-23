import { largeInput, smallInput } from "./input.mjs";
import { parseLines } from '../common/parsing.mjs';
import { Cell, CellFactory } from "./Cell.mjs";
import GeneralSet from '../common/GeneralSet.mjs';
import { Direction, LightBeam } from "./LightBeam.mjs";
import { sleep } from '../common/sleep.mjs';

/**
 * @type {Cell[][]}
 */
const matrix = ((input) => {
    return parseLines(input)
        .reduce((mat, line) => {
            mat.push(line.split('').map(CellFactory));
            return mat;
        }, [])
})(largeInput);

function solve() {
    const visitedPoints = new GeneralSet();
    const movementsCache = new GeneralSet();
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
        sleep(0.1);

        for (const [id, beam] of beams) {
            visitedPoints.add(beam.point);

            const cell = matrix[beam.point.i][beam.point.j];
            const movementResults = cell.calcMovement(beam.point, beam.direction);
            const validMovements = movementResults
                .filter(movementResult => movementResult.point.inRange(matrix))
                .filter(movement => !movementsCache.has(movement));
            
            movementsCache.addMultiple(...validMovements);

            if (validMovements.length === 0) {
                beamsToRemove.push(id);
            } else if (validMovements.length === 1) {
                const [movementResult] = validMovements;
                beamsToRemove.push(id);
                beamsToAdd.push(LightBeam.from(movementResult.point, movementResult.direction));
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

    const padding = 2;
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
            let charToAdd;

            if (char !== '.') {
                charToAdd = char;
            } else {
                switch (beams.length) {
                    case 0:
                        charToAdd = char;
                        break;
                    case 1:
                        charToAdd = directionToChar[beams[0].direction]
                        break;
                    default:
                        charToAdd = beams.length.toString()
                }
            }
            
            string += charToAdd;
            for (let i = 0; i < padding - charToAdd.length; i++) {
                string += ' ';          
            }
        }
        
        string += '\n';
    }

    string += '\n\n';

    console.log(string);
}