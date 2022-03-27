import { PokerCard } from './pocker-card'

class handAttribute {
    pair: number;
    three_of_kind: number;
    four_of_kind: number;
    two_pairs: any;
    full_house: number;
    straight: number;
    flush: number;
    straight_flush: number;
    pair_list: Array<number>;

    constructor() {
        this.pair = 0;
        this.three_of_kind = 0;
        this.four_of_kind = 0;
        this.two_pairs = 0;
        this.full_house = 0;
        this.straight = 0;
        this.flush = 0;
        this.straight_flush = 0;
        this.pair_list = [];
    }
}


export class PokerHand extends handAttribute {
    cards: Array<PokerCard>;
    playerName: String;

    constructor(cards: Array<PokerCard>, playerName: String) {
        super();
        this.cards = cards;
        this.playerName = playerName;
        this.similarCards();
        this.straightAndFlush();
    }

    private straightAndFlush() {
        this.cards.sort((a, b) => a.score - b.score);

        const highestRank = this.cards[this.cards.length - 1].score;
        let straight = true
        let flush = true;

        for (let i = 0; i < (this.cards.length - 1); i++) {
            const consecutive = this.cards[i].score === (this.cards[i+1].score - 1);
            const sameColor = this.cards[i].color === this.cards[i+1].color;

            straight = straight && consecutive;
            flush = flush && sameColor;
        }

        const straight_flush = straight && flush;

        this.straight = straight ? highestRank : 0;
        this.flush = flush ? highestRank : 0;
        this.straight_flush = straight_flush ? highestRank : 0; 
    }

    private similarCards() {
        let pair = 0;
        let three_of_kind = 0;
        let four_of_kind = 0;
        let pair_list: Array<number> = [];

        for (const card of this.cards) {
            const rankCount = this.cards.filter((c) => c.rank === card.rank).length;
            
            switch(rankCount) {
                case 2:  
                    pair = card.score;
                    if (!pair_list.some(el => el === card.score)) {
                        pair_list.push(card.score);
                    }
                    break;
                case 3:
                    three_of_kind = card.score;
                    break;
                case 4:
                    four_of_kind = card.score;
                    break;
                default:
                    break;
            }

        };

        const two_pairs = pair_list.length === 2 ? pair_list.reduce((sum, cur) => sum + cur, 0) : 0;
        const full_house = (three_of_kind && pair) ? three_of_kind : 0;

        this.pair = pair;
        this.three_of_kind = three_of_kind;
        this.four_of_kind = four_of_kind;
        this.pair_list = pair_list;
        this.two_pairs = two_pairs;
        this.full_house = full_house; 
    };
}