import input from "../big-input.mjs";
import { parseLines } from "../../common/parsing.mjs";
import { parseCard } from "./Card.mjs";
import Hand from "./Hand.mjs";
import "../../common/environment.mjs";

const hands = ((input) => {
    return parseLines(input)
        .map(handString => {
            const [cardsString, bidString] = handString.split(' ');
            
            const cards = cardsString.split('').map(char => parseCard(char));
            const bid = +bidString;
            return new Hand(cards, bid);
        });
})(input);

const answer = (() => {
    const handCategories = hands.reduce((map, hand) => {
        const worth = hand.getHandWorth();
    
        if (!map.has(worth)) {
            map.set(worth, []);
        }
    
        map.get(worth).push(hand);
    
        return map;
    }, new Map());

    let answer = 0;
    let currMultiplier = 1;
    const sortedCategories = [...handCategories.keys()].sortAndReturn((cat1, cat2) => cat1 - cat2);

    for (const category of sortedCategories) {
        const hands = handCategories.get(category).sortAndReturn((hand1, hand2) => hand1.compareTo(hand2));

        for (const hand of hands) {
            answer += hand.bid * currMultiplier++;
        }
    }

    return answer;
})();

console.log(answer);