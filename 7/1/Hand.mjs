import { Card } from "./Card.mjs";

export default class Hand {
    /**
     * 
     * @param {Card[]} cards 
     * @param {number} bid 
     */
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;

        const cardsCountMap = cards.reduce((map, card) => {
            if (map.has(card)) {
                map.set(card, map.get(card) + 1);
            } else {
                map.set(card, 1);
            }

            return map;
        }, new Map());
        const cardFrequencyArray = [...cardsCountMap.values()].sortAndReturn((count1, count2) => count2 - count1);

        this.sortedCardFrequencyArray = cardFrequencyArray;
    }

    /**
     * 
     * @returns {number}
     */
    getHandWorth() {
        return calcHandType(this.sortedCardFrequencyArray);
    }

    /**
     * 
     * @param {Hand} otherHand 
     * @returns {number}
     */
    compareTo(otherHand) {
        let firstDifferentIndex = 0;

        while (this.cards[firstDifferentIndex] === otherHand.cards[firstDifferentIndex]) {
            firstDifferentIndex++;
        }

        return this.cards[firstDifferentIndex] - otherHand.cards[firstDifferentIndex];
    }
}

/**
 * @readonly
 * @enum {number}
 */
const HandType = {
    HighCard: 0,
    OnePair: 1,
    TwoPairs: 2,
    ThreeOfAKind: 3,
    FullHouse: 4,
    FourOfAKind: 5,
    FiveOfAKind: 6
};

/**
 * 
 * @param {number[]} sortedCardFrequencyArray 
 * @returns {HandType}
 */
function calcHandType(sortedCardFrequencyArray) {
    switch (sortedCardFrequencyArray[0]) {
        case 5:
            return HandType.FiveOfAKind;
        case 4:
            return HandType.FourOfAKind;
        case 3:
            return sortedCardFrequencyArray[1] == 2 ? HandType.FullHouse : HandType.ThreeOfAKind
        case 2:
            return sortedCardFrequencyArray[1] == 2 ? HandType.TwoPairs : HandType.OnePair
        default:
            return HandType.HighCard;
    }
}