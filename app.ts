import prompts from 'prompts';
import { PokerCard, getAcceptedRanks, getAcceptedColors } from './pocker-card';
import PokerHand from './poker-hand';

export function printWinner(firstHand: PokerHand, secondHand: PokerHand) {
  function prettyPrintRank(cardScore: number) {
    switch (cardScore) {
      case 11:
        return 'Jack';
      case 12:
        return 'Queen';
      case 13:
        return 'King';
      case 14:
        return 'Ace';
      default:
        return cardScore.toString();
    }
  }
  const attributesPrettyPrint = {
    straightFlush: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with straight flush: ${prettyPrintRank(winnerHand.straightFlush)}`,
    fourOfKind: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with four of kind: ${prettyPrintRank(winnerHand.fourOfKind)}`,
    fullHouse: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with full house: ${prettyPrintRank(winnerHand.threeOfKind)} over ${prettyPrintRank(winnerHand.pair)}`,
    flush: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with flush: ${prettyPrintRank(winnerHand.flush)}`,
    straight: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with straight: ${prettyPrintRank(winnerHand.straight)}`,
    threeOfKind: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with three of kind: ${prettyPrintRank(winnerHand.threeOfKind)}`,
    twoPairs: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with two pairs: ${prettyPrintRank(Math.max(...winnerHand.pairList))}`,
    pair: (winnerHand: PokerHand) => `${winnerHand.playerName} wins. - with pair: ${prettyPrintRank(winnerHand.pair)}`,
  };

  for (const attribute of Object.keys(attributesPrettyPrint)) {
    if (firstHand[attribute as keyof typeof firstHand] > secondHand[attribute as keyof typeof secondHand]) {
      return attributesPrettyPrint[attribute as keyof typeof attributesPrettyPrint](firstHand);
    }

    if (firstHand[attribute as keyof typeof firstHand] < secondHand[attribute as keyof typeof secondHand]) {
      return attributesPrettyPrint[attribute as keyof typeof attributesPrettyPrint](secondHand);
    }
  }

  const firstHandCardScores = new Set(firstHand.cards.map((c) => c.score));
  const secondHandCardScores = new Set(secondHand.cards.map((c) => c.score));
  const duplicates = new Set<number>();

  for (const secondHandCardScore of secondHandCardScores) {
    if (firstHandCardScores.has(secondHandCardScore)) {
      duplicates.add(secondHandCardScore);
    }
  }

  const firstHandHighCard = firstHand.cards.filter((c) => !duplicates.has(c.score)).sort().pop() || { score: 0, rank: 0 };
  const secondHandHighCard = secondHand.cards.filter((c) => !duplicates.has(c.score)).sort().pop() || { score: 0, rank: 0 };

  if (firstHandHighCard.score > secondHandHighCard.score) {
    return `${firstHand.playerName} wins. - with high card: ${prettyPrintRank(firstHandHighCard.score)}`;
  }
  if (firstHandHighCard.score < secondHandHighCard.score) {
    return `${secondHand.playerName} wins. - with high card: ${prettyPrintRank(secondHandHighCard.score)}`;
  }
  return 'Tie.';
}
export function parseCards(cards: string) {
  const acceptedRank = getAcceptedRanks();
  const acceptedColors = getAcceptedColors();
  const separatedCards = cards.split(' ');

  if (separatedCards.length !== 5) {
    throw new Error('You must provide 5 cards per hand');
  }

  const parsedCards = separatedCards.map((c) => {
    const [rank, color] = c.split('');
    if (!acceptedRank.has(rank)) {
      throw new Error(`Unexptected card rank ${rank}, rank should be in : ${acceptedRank.values()}`);
    }
    if (!acceptedColors.has(color)) {
      throw new Error(`Unexptected card color ${color}, rank should be in : ${acceptedColors.values()}`);
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

    const outcome = printWinner(firstHand, secondHand);
    console.log(outcome);
  })();
}
