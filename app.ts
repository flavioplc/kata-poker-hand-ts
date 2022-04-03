import prompts from 'prompts';
import {
  PokerCard, Rank, Color,
} from './models/poker-card';
import PokerCombination, { CombinationType } from './models/poker-combination';
import PokerHand, { PlayOutcome } from './models/poker-hand';

export function printWinner(outcome: PlayOutcome | undefined) {
  function outcomeCombinationParser(pokerHand: PokerHand, combination: PokerCombination) {
    const winMessageMapper = {
        [CombinationType.STRAIGHT_FLUSH]: (pokerHand: PokerHand) => `${pokerHand.playerName} wins. - with straight flush: ${combination.firstHighestCard.rank}`,
        [CombinationType.FOUR_OF_KIND]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with four of kind: ${combination.firstHighestCard.rank}`,
        [CombinationType.FULL_HOUSE]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with full house: ${combination.firstHighestCard.rank} over ${combination.secondHighestCard?.rank}`,
        [CombinationType.FLUSH]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with flush: ${combination.firstHighestCard.rank}`,
        [CombinationType.STRAIGHT]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with straight: ${combination.firstHighestCard.rank}`,
        [CombinationType.THREE_OF_KIND]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with three of kind: ${combination.firstHighestCard.rank}`,
        [CombinationType.TWO_PAIRS]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with two pairs: ${combination.firstHighestCard.rank}`,
        [CombinationType.PAIR]: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with pair: ${combination.firstHighestCard.rank}`,
      }

      return winMessageMapper[combination.type](pokerHand);
  }

  if (outcome?.winningCombination) {
    return outcomeCombinationParser(outcome.winningHand, outcome.winningCombination);
  }

  if (outcome?.WinningCard) {
    return `${outcome.winningHand.playerName} wins. - with high card: ${outcome.WinningCard.rank}`
  }


  return `Tie.`
}
export function parseCards(cards: string) {
  const separatedCards = cards.split(' ');
  const colorMaper = new Map<string, Color>([
    ["S", Color.SPADES],
    ["H", Color.HEARTS],
    ["D", Color.DIMONDS],
    ["C", Color.CLUBS],
  ]);
  const rankMapper = new Map<string, Rank>([
    ["2", Rank.TWO],
    ["3", Rank.THREE],
    ["4", Rank.FOUR],
    ["5", Rank.FIVE],
    ["6", Rank.SIX],
    ["7", Rank.SEVEN],
    ["8", Rank.EIGHT],
    ["9", Rank.NINE],
    ["T", Rank.TEN],
    ["J", Rank.JACK],
    ["Q", Rank.QUEEN],
    ["K", Rank.KING],
    ["A", Rank.ACE],
  ]);

  const parsedCards = separatedCards.map((c) => {
    const [rawRank, rawColor] = c.split('');
    const color = colorMaper.get(rawColor);
    const rank = rankMapper.get(rawRank);

    if (!color) {
      throw new Error(`CLI Parsing error: ${rawColor} is not a valid color`);
    }
    if (!rank) {
      throw new Error(`CLI Parsing error: ${rawRank} is not a valid color`);
    }


    return new PokerCard(rank, color);
  });

  return parsedCards;
}

const questions: Array<prompts.PromptObject> = [
  {
    type: 'text',
    name: 'firstPlayerName',
    message: 'What is the first player name? (ex: "Flavio")',
  },
  {
    type: 'text',
    name: 'firstPlayerHand',
    message: 'What is the first player hand ? (ex: "2H 4S 4C 2D 4H")',
  },
  {
    type: 'text',
    name: 'secondPlayerName',
    message: 'What is the second player name? (ex: "Flavio")',
  },
  {
    type: 'text',
    name: 'secondPlayerHand',
    message: 'What is the second player hand ? (ex: "2H 4S 4C 2D 4H")',
  },
];
if (process.env.NODE_ENV === 'CLI') {
  (async () => {
    const {
      firstPlayerName, firstPlayerHand, secondPlayerName, secondPlayerHand,
    } = await prompts(questions);

    const firstHand = new PokerHand(parseCards(firstPlayerHand), firstPlayerName);
    const secondHand = new PokerHand(parseCards(secondPlayerHand), secondPlayerName);

    const outcome = firstHand.getWinnerOverOponent(secondHand);
    const stringOutcome = printWinner(outcome);

     console.log(stringOutcome);
  })();
}
