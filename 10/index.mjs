import { LogLevel, Logger } from "../common/Logger.mjs";
import Point from "../common/Point.mjs";
import { parseLines } from "../common/parsing.mjs";
import { DirectedOffset } from "./DirectedOffset.mjs";
import { Direction } from "./Direction.mjs";
import { NodeType, WorldMap } from "./Graph.mjs";
import { bigInput as input } from "./input.mjs";

Logger.logLevel = LogLevel.NONE;

const worldMap = ((input) => {
    return parseLines(input)
        .reduce((map, line) => {
            map.appendLine(line);
            return map;
        }, new WorldMap());
})(input);

function findLoopLength() {
    const { matrix } = worldMap;

    /**
     * 
     * @param {Point} cooordinates
     * @param {Direction} direction  
     */
    function findLoopLength(cooordinates, direction) {
        let counter = 0;
        let currPoint = cooordinates;
        let currDirection = direction;

        while (currPoint.inRange(matrix)) {
            const currCell = matrix[currPoint.i][currPoint.j];
            const directedOffset = NodeType.toDirectedOffset(currCell, currDirection);

            if (!directedOffset) {
                break;
            }

            counter++;

            const [iOffset, jOffset] = directedOffset.offset;
            currDirection = directedOffset.direction;
            currPoint = currPoint.withOffset(iOffset, jOffset);
        }

        return counter;
    }

    return Math.max(...Object.values(DirectedOffset).map((directedOffset) => {
        const { start } = worldMap;
        const [iOffset, jOffset] = directedOffset.offset;

        const newPoint = start.withOffset(iOffset, jOffset);

        return findLoopLength(newPoint, directedOffset.direction);
    }));
}

const loopLength = findLoopLength();
const maxDistInLoop = Math.floor(loopLength / 2) + 1;
console.log({ loopLength, maxDistInLoop });