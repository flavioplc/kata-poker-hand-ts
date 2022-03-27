import { PokerCard } from "./pocker-card";
import { PokerHand } from "./poker-hand";

export function printWinner(firstHand: PokerHand, secondHand: PokerHand) {
    function prettyPrintRank(cardScore: number) {
        switch(cardScore) {
            case 11:
                return "Jack";
            case 12:
                return "Queen";
            case 13:
                return "King";
            case 14:
                return "Ace";
            default:
                return cardScore.toString();
        }
    }
    const attributesPrettyPrint = {
        straight_flush: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with straight flush: ${prettyPrintRank(winnerHand.straight_flush)}`;
        },
        four_of_kind: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with four of kind: ${prettyPrintRank(winnerHand.four_of_kind)}`;
        },
        full_house: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with full house: ${prettyPrintRank(winnerHand.three_of_kind)} over ${prettyPrintRank(winnerHand.pair)}`;
        },
        flush: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with flush: ${prettyPrintRank(winnerHand.flush)}`;
        },
        straight: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with straight : ${prettyPrintRank(winnerHand.straight)}`;
        },
        three_of_kind: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with three of kind: ${prettyPrintRank(winnerHand.three_of_kind)}`;
        },
        two_pairs: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with two pairs: ${prettyPrintRank(Math.max(...winnerHand.pair_list))}`;
        },
        pair: (winnerHand: PokerHand) => {
            return `${winnerHand.playerName} wins. - with pair: ${prettyPrintRank(winnerHand.pair)}`;
        },
    };

    for (const attribute of Object.keys(attributesPrettyPrint)) {
        if (firstHand[attribute as keyof typeof firstHand] > secondHand[attribute as keyof typeof secondHand]) {
            return attributesPrettyPrint[attribute as keyof typeof attributesPrettyPrint](firstHand);
        }

        if (firstHand[attribute as keyof typeof firstHand] < secondHand[attribute as keyof typeof secondHand]) {
            return attributesPrettyPrint[attribute as keyof typeof attributesPrettyPrint](secondHand);
        }
    }
     
    const firstHandCardScores = new Set(firstHand.cards.map(c => c.score));
    const secondHandCardScores = new Set(secondHand.cards.map(c => c.score));
    const duplicates = new Set<number>();

    
    for (const secondHandCardScore of secondHandCardScores) {
        if (firstHandCardScores.has(secondHandCardScore)) {
            duplicates.add(secondHandCardScore);
        }
    }

    const firstHandHighCard = firstHand.cards.filter(c => !duplicates.has(c.score)).sort().pop() || { score: 0, rank: 0 };
    const secondHandHighCard = secondHand.cards.filter(c => !duplicates.has(c.score)).sort().pop() || {score: 0, rank: 0 };

    if (firstHandHighCard.score > secondHandHighCard.score) {
        return `${firstHand.playerName} wins. - with high card: ${prettyPrintRank(firstHandHighCard.score)}`;
    }
    if (firstHandHighCard.score < secondHandHighCard.score) {
        return `${secondHand.playerName} wins. - with high card: ${prettyPrintRank(secondHandHighCard.score)}`;
    }
    return "Tie.";

}
export function parseCards(cards: string) {
    const parsedCards = cards.split(" ").map(c => {
        const [rank, color] = c.split('');
        return new PokerCard(rank, color);
    });

    return parsedCards;
}
