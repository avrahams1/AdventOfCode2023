import { bigInput, smallInput } from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";
import { Segment } from "./Segment.mjs";

const model = (input => {
    const lines = parseLines(input);

    /**
     * @type {Segment[]}
     */
    const segments = [];

    for (let j = 0; j < lines[0].length; j++) {
        let currSegment = new Segment(lines.length);

        for (let i = 0; i < lines.length; i++) {
            switch (lines[i].charAt(j)) {
                case 'O':
                    currSegment.addRock();
                    break;
                case '#':
                    !currSegment.isEmpty() && segments.push(currSegment);
                    currSegment = new Segment(lines.length - i - 1);
                    break;
            }
        }

        if (!currSegment.isEmpty()) {
            segments.push(currSegment);
        }
    }

    return segments;
})(bigInput);

const sum = model.reduce((sum, segment) => sum + segment.score(), 0);

console.log(sum);