export class PokerCard {
    color: string;
    rank: string;
    score: number;

    constructor(rank: string, color: string) {
        const cardScoreMapper = new Map([
            ["2", 2],
            ["3", 3],
            ["4", 4],
            ["5", 5],
            ["6", 6],
            ["7", 7],
            ["8", 8],
            ["9", 9],
            ["T", 10],
            ["J", 11],
            ["Q", 12],
            ["K", 13],
            ["A", 14],
        ]);
        const colorMapper = new Map([
            ["C", "C"],
            ["H", "H"],
            ["D", "D"],
            ["S", "S"],
        ]);

        this.rank = rank;
        this.color = colorMapper.get(color)!;
        this.score = cardScoreMapper.get(this.rank)!;
    }

    getRank() {
        return this.rank;
    }
}
