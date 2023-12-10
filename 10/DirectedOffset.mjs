import { Direction } from "./Direction.mjs";

export const DirectedOffset = {
    North: {
        direction: Direction.North,
        offset: [-1, 0]
    },
    South: {
        direction: Direction.South,
        offset: [1, 0]
    },
    East: {
        direction: Direction.East,
        offset: [0, 1]
    },
    West: {
        direction: Direction.West,
        offset: [0, -1]
    }
}