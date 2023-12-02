import input from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";

function parseInput() {
    return parseLines(input);
}

const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

const parsedInputs = parseInput();
// const rgx = /^[a-z]*?(?<firstNum>\d)[a-z0-9]*?(?<secondNum>\d)?[a-z]*$/
const twoNumsRgx = /^[a-z]*?(?<firstNum>\d|one|two|three|four|five|six|seven|eight|nine)((\d|one|two|three|four|five|six|seven|eight|nine)*[a-z0-9]*)*(?<secondNum>\d|one|two|three|four|five|six|seven|eight|nine)[a-z]*$/
const onlyNumRgx = /(?<onlyNum>\d|one|two|three|four|five|six|seven|eight|nine)/
let sum = 0;

function parseNumber(number) {
    const actualNumber = +number;
    if (!isNaN(actualNumber)) {
        return actualNumber;
    }

    return numbers[number];
}

function findMatch(inputLine) {
    let match;
    if (match = inputLine.match(twoNumsRgx)) {
        const { firstNum, secondNum } = match.groups;
        return {
            firstNum,
            secondNum
        };
    } else if (match = inputLine.match(onlyNumRgx)) {
        const { onlyNum } = match.groups;
        return {
            firstNum: onlyNum,
            secondNum: onlyNum
        };
    }
}

for (const inputLine of parsedInputs) {
    const match = findMatch(inputLine);

    if (!match) {
        debugger;
    }

    const { firstNum, secondNum } = match;
    const currValue = (parseNumber(firstNum) * 10) + parseNumber(secondNum);
    sum += currValue;
}

console.log("sum: ", sum)