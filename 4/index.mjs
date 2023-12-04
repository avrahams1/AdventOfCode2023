import input from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";

class Card {
    constructor(cardNumber, winningNumbers, myNumbers) {
        this.cardNumber = cardNumber;
        this.winningNumbers = new Set(winningNumbers);
        this.myNumbers = myNumbers;
    }

    calculatePoints() {
        const numOfMatching = this.myNumbers.reduce((total, number) => {
            if (this.winningNumbers.has(number)) {
                total++;
            }

            return total;
        }, 0);

        if (numOfMatching === 0) {
            return 0;
        }

        return 1 << (numOfMatching - 1);
    }
}

const cards = (input => {
    function getCardNumber(line) {
        const rgx = /Card\s+(?<cardNum>\d+):/;
        const match = line.match(rgx);

        if (!match) debugger;

        return +match.groups.cardNum;
    }

    function parseNumberList(numberListString) {
        return numberListString
            .split(' ')
            .filter(num => num && num.trim())
            .map(num => num.trim())
            .map(num => +num);
    }

    return parseLines(input)
        .map(line => {
            const cardNumber = getCardNumber(line);
            const numberLists = line.substring(line.indexOf(': ') + 2);
            const [winningNumbers, myNumbers] = numberLists.split(' | ').map(parseNumberList);
            return new Card(cardNumber, winningNumbers, myNumbers);
        });
})(input);

const answer = cards.reduce((sum, card) => sum + card.calculatePoints(), 0);
console.log(answer);