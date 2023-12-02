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

const sum = [...games.values()].reduce((prevSum, gameTurns) => {
    const maxes = gameTurns.reduce((prevMaxes, gameTurn) => {
        prevMaxes.red = Math.max(prevMaxes.red, gameTurn.red);
        prevMaxes.green = Math.max(prevMaxes.green, gameTurn.green);
        prevMaxes.blue = Math.max(prevMaxes.blue, gameTurn.blue);

        return prevMaxes;
    }, {
        red: -1,
        green: -1,
        blue: -1
    });

    if (maxes.red < 0 || maxes.green < 0 || maxes.blue < 0) {
        debugger;
    }

    prevSum += maxes.red * maxes.green * maxes.blue;

    return prevSum;
}, 0);

console.log(sum);