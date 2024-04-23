import memoize from "memoize";
import { Direction } from "./LightBeam.mjs";
import Point from "../common/Point.mjs";

const CellEnum = {
    Empty: '.',
    '/': '/',
    '\\': '\\',
    HorizontalSplitter: '-',
    VerticalSplitter: '|'
};

export const CellFactory = _cellFactory;

/**
 * 
 * @param {string} cellValue 
 * @returns {Cell}
 */
function _cellFactory(cellValue) {
    switch (cellValue) {
        case CellEnum.Empty:
            return new EmptyCell();
        case CellEnum["/"]:
            return new SlashCell();
        case CellEnum["\\"]:
            return new BackSlashCell();
        case CellEnum.VerticalSplitter:
            return new VerticalSplitterCell();
        case CellEnum.HorizontalSplitter:
            return new HorizontalSplitterCell();
    }
}

export class MovementResult {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    constructor(point, direction) {
        this.point = point;
        this.direction = direction;
    }

    /**
     * 
     * @returns {string}
     */
    toIdString() {
        return `${this.point.toIdString()},${this.direction}`;
    }
}

export class Cell {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     * @returns {MovementResult[]}
     */
    calcMovement(point, direction) {
        return [];
    }

    /**
     * @returns {string}
     */
    toString() {

    }
}

class EmptyCell extends Cell {
    constructor() {
        super();
        this.usedDirections = new Set();
    }

    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     * @returns {MovementResult[]}
     */
    calcMovement(point, direction) {
        if (this.usedDirections.has(direction)) {
            return [];
        }

        this.usedDirections.add(direction);

        let newPoint;

        switch (direction) {
            case Direction.North:
                newPoint = new Point(point.i - 1, point.j);
                break;
            case Direction.South:
                newPoint = new Point(point.i + 1, point.j);
                break;
            case Direction.East:
                newPoint = new Point(point.i, point.j + 1);
                break;
            case Direction.West:
                newPoint = new Point(point.i, point.j - 1);
                break;
        }

        return [new MovementResult(
            newPoint,
            direction
        )];
    }

    toString() {
        return CellEnum.Empty;
    }
}

// '/'
class SlashCell extends EmptyCell {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    calcMovement(point, direction) {
        switch (direction) {
            case Direction.North:
                return super.calcMovement(point, Direction.East);
            case Direction.South:
                return super.calcMovement(point, Direction.West);
            case Direction.East:
                return super.calcMovement(point, Direction.North);
            case Direction.West:
                return super.calcMovement(point, Direction.South);
        }
    }

    toString() {
        return CellEnum["/"];
    }
}

// '\'
class BackSlashCell extends EmptyCell {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    calcMovement(point, direction) {
        switch (direction) {
            case Direction.North:
                return super.calcMovement(point, Direction.West);
            case Direction.South:
                return super.calcMovement(point, Direction.East);
            case Direction.East:
                return super.calcMovement(point, Direction.South);
            case Direction.West:
                return super.calcMovement(point, Direction.North);
        }
    }

    toString() {
        return CellEnum["\\"];
    }
}

// '-'
class HorizontalSplitterCell extends EmptyCell  {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    calcMovement(point, direction) {
        switch (direction) {
            case Direction.North:
            case Direction.South:
                return [
                    super.calcMovement(point, Direction.East),
                    super.calcMovement(point, Direction.West)
                ].flatMap(x => x);
            case Direction.East:
            case Direction.West:
                return super.calcMovement(point, direction);
        }
    }

    toString() {
        return CellEnum.HorizontalSplitter;
    }
}

// '|'
class VerticalSplitterCell extends EmptyCell  {
    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    calcMovement(point, direction) {
        switch (direction) {
            case Direction.East:
            case Direction.West:
                return [
                    super.calcMovement(point, Direction.North),
                    super.calcMovement(point, Direction.South)
                ].flatMap(x => x);
            case Direction.North:
            case Direction.South:
                return super.calcMovement(point, direction);
        }
    }

    toString() {
        return CellEnum.VerticalSplitter;
    }
}