import input from "./input.mjs";
import { parseLines, parseNumberList } from "../common/parsing.mjs";

class Card {
    constructor(cardNumber, winningNumbers, myNumbers) {
        this.cardNumber = cardNumber;
        this.winningNumbers = new Set(winningNumbers);
        this.myNumbers = myNumbers;
        this.points = null;
    }

    calculatePoints() {
        if (this.points !== null) {
            return this.points;
        }

        const numOfMatching = this.myNumbers.reduce((total, number) => {
            if (this.winningNumbers.has(number)) {
                total++;
            }

            return total;
        }, 0);

        this.points = numOfMatching;

        return numOfMatching;
    }
}

const cards = (input => {
    function getCardNumber(line) {
        const rgx = /Card\s+(?<cardNum>\d+):/;
        const match = line.match(rgx);

        if (!match) debugger;

        return +match.groups.cardNum;
    }

    return parseLines(input)
        .reduce((cardMap, line) => {
            const cardNumber = getCardNumber(line);
            const numberLists = line.substring(line.indexOf(': ') + 2);
            const [winningNumbers, myNumbers] = numberLists.split(' | ').map(parseNumberList);
            const card = new Card(cardNumber, winningNumbers, myNumbers);
            
            cardMap.set(cardNumber, card);
            return cardMap;
        }, new Map());
})(input);

const cardIdsToProcess = [...cards.keys()];
let processedCards = 0;

while (cardIdsToProcess.length) {
    processedCards++;

    const cardId = cardIdsToProcess.pop();
    const card = cards.get(cardId);
    const cardPoints = card.calculatePoints();

    for (let i = cardId + 1; i <= cards.size && i <= cardId + cardPoints; i++) {
        cardIdsToProcess.push(i);
    }
}
// const processedCards = (() => {
//     const cache = new Map();

//     function calcProcessed(cardId) {
//         return cache.get(cardId) || (() => {
//             const card = cards.get(cardId);
//             const cardPoints = card.calculatePoints();

//             let result = 1;
//             if (cardPoints) {
//                 for (let i = cardId + 1; i <= cards.size && i <= cardId + cardPoints; i++) {
//                     result += calcProcessed(i);
//                 }
//             }

//             cache.set(cardId, result);
//             return result;
//         })();
//     }

//     return [...cards.keys()].reduce((total, cardId) => total + calcProcessed(cardId), 0);
// })();

console.log(processedCards);