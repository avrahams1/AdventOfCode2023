import { smallInput, bigInput } from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";
import History from "./History.mjs";

const histories = ((input) => {
    return parseLines(input)
        .map(line => parseNumberList(line))
        .map(numbers => new History().addMultiple(numbers));
})(bigInput);

const answer = histories.reduce((sum, history) => {
    const currHistories = [history];
    let currHistory = history;

    while (!currHistory.isSameDifference) {
        const newHistory = new History();
        for (let i = 1; i < currHistory.numbers.length; i++) {
            newHistory.add(currHistory.numbers[i] - currHistory.numbers[i - 1]);
        }

        currHistories.push(newHistory);
        currHistory = newHistory;
    }

    currHistories[currHistories.length - 1].addWithSameDifference();

    for (let i = currHistories.length - 2; i >= 0; i--) {
        const difference = (() => {
            const { numbers: nextHistoryNumbers } = currHistories[i + 1];
            return nextHistoryNumbers[nextHistoryNumbers.length - 1];
        })();

        const currHistory = currHistories[i];
        currHistory.add(currHistory.numbers[currHistory.numbers.length - 1] + difference);
    }

    return sum + currHistories[0].numbers[currHistories[0].numbers.length - 1];
}, 0);

console.log(answer);