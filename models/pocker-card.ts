/* eslint-disable @typescript-eslint/no-non-null-assertion */
export enum Rank {
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  EIGHT = "EIGHT",
  NINE = "NINE",
  TEN = "TEN",
  JACK = "JACK",
  QUEEN = "QUEEN",
  KING = "KING",
  ACE = "ACE",
}

export enum Color {
  CLUBS = "CLUBS",
  HEARTS = "HEARTS",
  DIMONDS = "DIMONDS",
  SPADES = "SPADES",
}

const rankScoreMapper = new Map<Rank, number>([
  [Rank.TWO, 2],
  [Rank.THREE, 3],
  [Rank.FOUR, 4],
  [Rank.FIVE, 5],
  [Rank.SIX, 6],
  [Rank.SEVEN, 7],
  [Rank.EIGHT, 8],
  [Rank.NINE, 9],
  [Rank.TEN, 10],
  [Rank.JACK, 11],
  [Rank.QUEEN, 12],
  [Rank.KING, 13],
  [Rank.ACE, 14],
]);

export class PokerCard {
  color: Color;

  rank: Rank;

  score: number;

  constructor(rank: Rank, color: Color) {
    if (rank in Rank){
      this.rank = rank;
      this.score = rankScoreMapper.get(rank)!;
    } else {
      throw new Error(`${rank} is not a valid card rank`)
    }
    
    if (color in Color) {
      this.color = color;
    } else {
      throw new Error(`${color} is not a valid card color`)
    }
  }
}

