import { bigInput, smallInput } from "./input.mjs";
import { parseLines } from "../common/parsing.mjs"
import { Pattern, PatternBuilder } from "./Pattern.mjs";

const model = (input => {
    /**
     * @type {Pattern[]}
     */
    const patterns = [];
    let patternBuilder = new PatternBuilder();

    for (const line of parseLines(input, false)) {
        if (!line) {
            patterns.push(patternBuilder.build());
            patternBuilder = new PatternBuilder();
        } else {
            patternBuilder.appendLine(line);
        }
    }

    patterns.push(patternBuilder.build());

    return patterns;
})(bigInput)

console.log(model.reduce((acc, pattern) => acc + pattern.getScore(), 0));