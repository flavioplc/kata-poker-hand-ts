import { PokerCard } from './pocker-card';

export default class PokerHand {
  cards: Array<PokerCard>;

  playerName: String;

  pair: number;

  threeOfKind: number;

  fourOfKind: number;

  twoPairs: any;

  fullHouse: number;

  straight: number;

  flush: number;

  straightFlush: number;

  pairList: Array<number>;

  constructor(cards: Array<PokerCard>, playerName: String) {
    this.cards = cards;
    this.playerName = playerName;
    this.pair = 0;
    this.threeOfKind = 0;
    this.fourOfKind = 0;
    this.twoPairs = 0;
    this.fullHouse = 0;
    this.straight = 0;
    this.flush = 0;
    this.straightFlush = 0;
    this.pairList = [];
    this.similarCards();
    this.straightAndFlush();
  }

  private straightAndFlush() {
    this.cards.sort((a, b) => a.score - b.score);

    const highestRank = this.cards[this.cards.length - 1].score;
    let straight = true;
    let flush = true;

    for (let i = 0; i < (this.cards.length - 1); i += 1) {
      const consecutive = this.cards[i].score === (this.cards[i + 1].score - 1);
      const sameColor = this.cards[i].color === this.cards[i + 1].color;

      straight = straight && consecutive;
      flush = flush && sameColor;
    }

    const straightFlush = straight && flush;

    this.straight = straight ? highestRank : 0;
    this.flush = flush ? highestRank : 0;
    this.straightFlush = straightFlush ? highestRank : 0;
  }

  private similarCards() {
    let pair = 0;
    let threeOfKind = 0;
    let fourOfKind = 0;
    const pairList: Array<number> = [];

    for (const card of this.cards) {
      const rankCount = this.cards.filter((c) => c.rank === card.rank).length;

      switch (rankCount) {
        case 2:
          pair = card.score;
          if (!pairList.some((el) => el === card.score)) {
            pairList.push(card.score);
          }
          break;
        case 3:
          threeOfKind = card.score;
          break;
        case 4:
          fourOfKind = card.score;
          break;
        default:
          break;
      }
    }

    const twoPairs = pairList.length === 2 ? pairList.reduce((sum, cur) => sum + cur, 0) : 0;
    const fullHouse = (threeOfKind && pair) ? threeOfKind : 0;

    this.pair = pair;
    this.threeOfKind = threeOfKind;
    this.fourOfKind = fourOfKind;
    this.pairList = pairList;
    this.twoPairs = twoPairs;
    this.fullHouse = fullHouse;
  }
}
