import { DirectedOffset } from "./DirectedOffset.mjs";
import { Direction } from "./Direction.mjs";

/**
 * @enum {string}
 */
export const NodeType = {
    'S': 's', // starting position
    '|': '|', // verticalPipe,
    '-': '-', // horizontalPipe
    'L': 'L', // bend north-east
    'J': 'J', // bend north-west
    '7': '7', // bend south-west
    'F': 'F', // bend south-east
    '.': '.', // sand,

    /**
     * 
     * @param {string} char 
     * @returns {NodeType}
     */
    parse(char) {
        return NodeType[char];
    },

    /**
     * 
     * @param {NodeType} nodeType
     * @param {Direction} direction  
     */
    toDirectedOffset(nodeType, direction) {
        switch (nodeType) {
            case NodeType["|"]:
                if ([Direction.East, Direction.West].includes(direction)) {
                    return null;
                }

                return direction === Direction.North ? DirectedOffset.North : DirectedOffset.South;
            case NodeType["-"]:
                if ([Direction.North, Direction.South].includes(direction)) {
                    return null;
                }

               return direction === Direction.East ? DirectedOffset.East : DirectedOffset.West;
            case NodeType.L:
                if ([Direction.North, Direction.East].includes(direction)) {
                    return null;
                }

                if (direction === Direction.West) {
                    return DirectedOffset.North;
                } else {
                    return DirectedOffset.East;
                }
            case NodeType[7]:
                if ([Direction.South, Direction.West].includes(direction)) {
                    return null;
                }

                if (direction === Direction.East) {
                    return DirectedOffset.South;
                } else {
                    return DirectedOffset.West;
                }
            case NodeType.F:
                if ([Direction.South, Direction.East].includes(direction)) {
                    return null;
                }

                if (direction === Direction.North) {
                    return DirectedOffset.East;
                } else {
                    return DirectedOffset.South;
                }
            case NodeType.J:
                if ([Direction.North, Direction.West].includes(direction)) {
                    return null;
                }

                if (direction === Direction.South) {
                    return DirectedOffset.West;
                } else {
                    return DirectedOffset.North;
                }
            default:
                return null;
        }
    }
};

export class WorldMap {
    constructor() {
        /**
         * @type {NodeType[][]}
         */
        this.matrix = []

        /**
         * @type {Coordinates}
         */
        this.start = null;
    }

    /**
     * 
     * @param {string} line 
     */
    appendLine(line) {
        this.matrix.push(line.split('').map(NodeType.parse));

        if (this.start) return;

        let index;
        if ((index = line.indexOf('S')) !== -1) {
            this.start = new Coordinates(this.matrix.length - 1, index);
        }
    }
}

export class Coordinates {
    /**
     * 
     * @param {number} i 
     * @param {number} j 
     */
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    withOffset(iOffset, jOffset) {
        return new Coordinates(this.i + iOffset, this.j + jOffset);
    }

    /**
     * 
     * @param {T[][]} matrix 
     * @template T
     */
    inRange(matrix) {
        return this.i >= 0 && this.j >= 0 &&
            this.i < matrix.length &&
            this.j < matrix[this.i].length;
    }
}