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

