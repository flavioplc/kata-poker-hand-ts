/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PokerCard } from "./poker-card";

export enum CombinationType {
    STRAIGHT_FLUSH = "STRAIGHT_FLUSH",
    FOUR_OF_KIND = "FOUR_OF_KIND",
    FULL_HOUSE = "FULL_HOUSE",
    FLUSH = "FLUSH",
    STRAIGHT = "STRAIGHT",
    THREE_OF_KIND = "THREE_OF_KIND",
    TWO_PAIRS = "TWO_PAIRS",
    PAIR = "PAIR",
}
const combinationValueMapper = new Map<CombinationType, number>([
    [CombinationType.STRAIGHT_FLUSH, 8],
    [CombinationType.FOUR_OF_KIND, 7],
    [CombinationType.FULL_HOUSE, 6],
    [CombinationType.FLUSH, 5],
    [CombinationType.STRAIGHT, 4],
    [CombinationType.THREE_OF_KIND, 3],
    [CombinationType.TWO_PAIRS, 2],
    [CombinationType.PAIR, 1],
]);

export default class PokerCombination {
    type: CombinationType;
    value: number;
    firstHighestCard: PokerCard;
    secondHighestCard?: PokerCard;
    constructor (type: CombinationType, firstHighestCard: PokerCard, secondHighestCard?: PokerCard) {
        if (type in CombinationType) {
            this.type = type;
            this.value = combinationValueMapper.get(type)!;
        } else {
            throw new Error(`${type} is an invalid combination type`);
        }

        this.firstHighestCard = firstHighestCard;
        this.secondHighestCard = secondHighestCard;
    }
}

