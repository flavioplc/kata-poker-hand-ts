import { PokerCard } from './poker-card';
import PokerCombination, { CombinationType } from './poker-combination';

function findCombinations (cards: Array<PokerCard>) {
  function straightAndFlushCombinations(cards: Array<PokerCard>) {
    const straightAndFlushCombinations: Array<PokerCombination> = [];

    cards.sort((a, b) => a.score - b.score);

    const highestCard = cards[cards.length - 1];
    let straight = true;
    let flush = true;

    for (let i = 0; i < (cards.length - 1); i += 1) {
      const consecutive = cards[i].score === (cards[i + 1].score - 1);
      const sameColor = cards[i].color === cards[i + 1].color;

      straight = straight && consecutive;
      flush = flush && sameColor;
    }
    if (straight && flush) {
      straightAndFlushCombinations.push(new PokerCombination(CombinationType.STRAIGHT_FLUSH, highestCard));
    } else if (straight) {
      straightAndFlushCombinations.push(new PokerCombination(CombinationType.STRAIGHT, highestCard));
    } else if (flush) {
      straightAndFlushCombinations.push(new PokerCombination(CombinationType.FLUSH, highestCard));
    }

 
    return straightAndFlushCombinations;
  }
  function similarCardsCombinations(cards: Array<PokerCard>) {
    const similarCardsCombinations: Array<PokerCombination> = [];
    const pairList: Array<PokerCard> = [];
    let pairCard, threeOfKindCard, fourOfKindCard;

    cards.forEach((card) => {
      const cardCount = cards.filter((c) => c.rank === card.rank).length;

      switch (cardCount) {
        case 2:
          pairCard = card;
          if (!pairList.some((pairCard) => pairCard.score === card.score)) {
            pairList.push(card);
          }
          break;
        case 3:
          threeOfKindCard = card;
          break;
        case 4:
          fourOfKindCard = card;
          break;
        default:
          break;
      }
    });

    if (pairList.length === 2) {
      pairList.sort(card => card.score);
      const [secondHighestCard, firstHighestCard] = pairList;

      similarCardsCombinations.push(new PokerCombination(CombinationType.TWO_PAIRS, firstHighestCard, secondHighestCard));
    } else if (pairCard && threeOfKindCard) {
      similarCardsCombinations.push(new PokerCombination(CombinationType.FULL_HOUSE, threeOfKindCard, pairCard));
    } else if (fourOfKindCard) {
      similarCardsCombinations.push(new PokerCombination(CombinationType.FOUR_OF_KIND, fourOfKindCard, pairCard));
    } else if (threeOfKindCard) {
      similarCardsCombinations.push(new PokerCombination(CombinationType.THREE_OF_KIND, threeOfKindCard));
    } else if (pairCard) {
      similarCardsCombinations.push(new PokerCombination(CombinationType.PAIR, pairCard));
    }

    return similarCardsCombinations;
  }

  const allCombinations = [
    ...similarCardsCombinations(cards),
    ...straightAndFlushCombinations(cards)
  ];

  return allCombinations.sort((combination) => combination.value);
}
export type PlayOutcome = {
  winningHand: PokerHand;
  winningCombination?: PokerCombination;
  WinningCard?: PokerCard; 
}

export default class PokerHand {
  cards: Array<PokerCard>;

  playerName: string;

  combinations: Array<PokerCombination>


  constructor(cards: Array<PokerCard>, playerName: string) {
    if (cards.length !== 5) {
      throw new Error("PockerHand must have 5 cards");
    }
    this.cards = cards;
    this.playerName = playerName;
    this.combinations = findCombinations(cards);
  }

  getWinnerOverOponent(oponentHand: PokerHand): PlayOutcome | undefined  {
    // This loop intend to find winner by combinations
    if (!this.combinations.length && oponentHand.combinations.length) {
      const [winningCombination] = oponentHand.combinations;
      return {
        winningHand: oponentHand,
        winningCombination,
      }
    }
    for (const [rank, combination] of this.combinations.entries()) {
      const oponentCombination = oponentHand.combinations[rank];
      const playerWinsByCombination = (combination?.value ?? 0) > (oponentCombination?.value ?? 0);
      const oponentWinsByCombination = (combination?.value ?? 0) < (oponentCombination?.value ?? 0);
      const sameCombinationTypes =  combination?.type === oponentCombination?.type;

      if (playerWinsByCombination) {
        return {
          winningHand: this,
          winningCombination: combination,
        };
      }

      if (oponentWinsByCombination) {
        return {
          winningHand: oponentHand,
          winningCombination: oponentCombination,
        }
      }

      if (sameCombinationTypes) {
        const playerWinsByCards = combination.firstHighestCard.score > oponentCombination.firstHighestCard.score ||
        ((combination?.firstHighestCard?.score === oponentCombination?.firstHighestCard?.score) && 
        (combination?.secondHighestCard?.score ?? 0) > (oponentCombination?.secondHighestCard?.score ?? 0));

        const oponentWinsByCards = combination.firstHighestCard.score < oponentCombination.firstHighestCard.score ||
        ((combination?.firstHighestCard?.score === oponentCombination?.firstHighestCard?.score) && 
        (combination?.secondHighestCard?.score ?? 0) < (oponentCombination?.secondHighestCard?.score ?? 0));

        if (playerWinsByCards) {
          return {
            winningHand: this,
            winningCombination: combination,
          };
        }
  
        if (oponentWinsByCards) {
          return {
            winningHand: oponentHand,
            winningCombination: oponentCombination,
          }
        }
      }
    }
    // This part of the code intend to find winners without combinations
    const handCardScores = new Set(this.cards.map((c) => c.score));
    const oponentHandCardScores = new Set(oponentHand.cards.map((c) => c.score));
    const duplicates = new Set<number>();
  
    for (const secondHandCardScore of oponentHandCardScores) {
      if (handCardScores.has(secondHandCardScore)) {
        duplicates.add(secondHandCardScore);
      }
    } 
    
    const handHighCard = this.cards.filter((c) => !duplicates.has(c.score)).sort().pop();
    const oponentHandHighCard = oponentHand.cards.filter((c) => !duplicates.has(c.score)).sort().pop();
  
    if ((handHighCard?.score ?? 0) > (oponentHandHighCard?.score ?? 0)) {
      return {
        winningHand: this,
        WinningCard: handHighCard,
      };
    }

    if ((handHighCard?.score ?? 0) < (oponentHandHighCard?.score ?? 0)) {
      return {
        winningHand: oponentHand,
        WinningCard: oponentHandHighCard,
      };
    }
  }
}
