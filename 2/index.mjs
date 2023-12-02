import input from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";

const games = ((input) => {
    /**
     * 
     * @param {string} line 
     */
    function getGameNumber(line) {
        const rgx = /^Game (?<gameNum>\d+): /
        const match = line.match(rgx);

        if (!match) {
            debugger;
        }

        return {
            length: match[0].length,
            gameId: +match.groups.gameNum
        }
    }

    return parseLines(input)
        .reduce((gamesSet, line) => {
            const { gameId, length: gameNumMatchLen } = getGameNumber(line);

            const gameTurns = line.substring(gameNumMatchLen).split('; ').reduce((turnsArray, gameTurn) => {
                const turnRgx = /((, )?(((?<red>\d+) red)|((?<green>\d+) green)|((?<blue>\d+) blue)))+?/g
                const result = {
                    red: 0,
                    green: 0,
                    blue: 0
                };

                let match;
                while (match = turnRgx.exec(gameTurn)) {
                    const { red, green, blue } = match.groups
                    result.red = +red || result.red;
                    result.green = +green || result.green;
                    result.blue = +blue || result.blue;
                }

                turnsArray.push(result);

                return turnsArray;
            }, []);

            gamesSet.set(gameId, gameTurns);
            return gamesSet;
        }, new Map());
})(input);

const sum = [...games.entries()].reduce((prevSum, [gameId, gameTurns]) => {
    const gamePossible = gameTurns.every(turn => {
        return turn.red <= 12 &&
               turn.green <= 13 &&
               turn.blue <= 14;
    });

    if (gamePossible) {
        prevSum += gameId;
    }

    return prevSum;
}, 0);

console.log(sum);