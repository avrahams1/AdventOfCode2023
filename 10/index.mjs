import { LogLevel, Logger } from "../common/Logger.mjs";
import { parseLines } from "../common/parsing.mjs";
import { DirectedOffset } from "./DirectedOffset.mjs";
import { Direction } from "./Direction.mjs";
import { Coordinates, NodeType, WorldMap } from "./Graph.mjs";
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
     * @param {Coordinates} cooordinates
     * @param {Direction} direction  
     */
    function findLoopLength(cooordinates, direction) {
        let counter = 0;
        let currCoordinates = cooordinates;
        let currDirection = direction;

        while (currCoordinates.inRange(matrix)) {
            const currCell = matrix[currCoordinates.i][currCoordinates.j];
            const directedOffset = NodeType.toDirectedOffset(currCell, currDirection);

            if (!directedOffset) {
                break;
            }

            counter++;

            const [iOffset, jOffset] = directedOffset.offset;
            currDirection = directedOffset.direction;
            currCoordinates = currCoordinates.withOffset(iOffset, jOffset);
        }

        return counter;
        /*
        if (!cooordinates.inRange(matrix)) {
            return 0;
        }

        const currCell = matrix[cooordinates.i][cooordinates.j];
        const directedOffset = NodeType.toDirectedOffset(currCell, direction);

        Logger.debug("processing", { cooordinates, currCell, directedOffset });

        if (!directedOffset) {
            Logger.debug("was 0\n\n\n");
            return 0;
        }

        const [iOffset, jOffset] = directedOffset.offset;
        const nextCoordinates = cooordinates.withOffset(iOffset, jOffset);

        Logger.debug("continuing to", nextCoordinates);
        Logger.debug("\n\n\n")
        return 1 + findLoopLength(nextCoordinates, directedOffset.direction);
        */
    }

    return Math.max(...Object.values(DirectedOffset).map((directedOffset) => {
        const { start } = worldMap;
        const [iOffset, jOffset] = directedOffset.offset;

        const newCoordinates = start.withOffset(iOffset, jOffset);

        Logger.info("starting work on", {newCoordinates, direction: directedOffset.direction});
        return findLoopLength(newCoordinates, directedOffset.direction);
    }));
}

const loopLength = findLoopLength();
const maxDistInLoop = Math.floor(loopLength / 2) + 1;
console.log({ loopLength, maxDistInLoop });