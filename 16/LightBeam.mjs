import { v4 as uuidv4 } from 'uuid';
import Point from '../common/Point.mjs';

/**
 * @enum
 */
export const Direction = {
    North: 'N',
    South: 'S',
    East: 'E',
    West: 'W'
}

export class LightBeam {
    /**
     * 
     * @param {number} i 
     * @param {number} j 
     * @param {Direction} direction 
     */
    constructor(i, j, direction) {
        this.point = new Point(i, j);
        this.direction = direction;
        this.id = uuidv4();
    }

    /**
     * 
     * @param {Point} point 
     * @param {Direction} direction 
     */
    static from(point, direction) {
        return new LightBeam(point.i, point.j, direction);
    }
}