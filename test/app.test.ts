import { expect } from 'chai';
import { PokerHand } from "../poker-hand";
import { parseCards, printWinner } from "../app";

describe('Kata PokerHand - printWinner()', function () {
    it('White should win ace with high card', function () {

        const blackHand = new PokerHand(parseCards("2H 3D 5S 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("2C 3H 4S 8C AH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("White wins. - with high card: Ace");
    });
    it('Black should win with full house', function () {

        const blackHand = new PokerHand(parseCards("2H 4S 4C 2D 4H"), "Black");
        const whiteHand = new PokerHand(parseCards("2S 8S AS QS 3S"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with full house: 4 over 2");
    });
    it('Black should win with high card', function () {

        const blackHand = new PokerHand(parseCards("2H 3D 5S 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("2C 3H 4S 8C KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with high card: 9");
    });
    it('No one should win', function () {

        const blackHand = new PokerHand(parseCards("2H 3D 5S 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("2D 3H 5C 9S KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Tie.");
    });
    it('Black should win with pair', function () {

        const blackHand = new PokerHand(parseCards("2H 2D 5S 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("2C 3H 4S 8C KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with pair: 2");
    });
    it('Black should win with two pairs', function () {

        const blackHand = new PokerHand(parseCards("2H 2D KS 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("2C 2H 4S 8C 4H"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with two pairs: King");
    });
    it('White should win with three of kind', function () {

        const blackHand = new PokerHand(parseCards("2H 3D 5S 9C KD"), "Black");
        const whiteHand = new PokerHand(parseCards("AC AH AS 8C KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("White wins. - with three of kind: Ace");
    });
    it('Black should win with flush', function () {

        const blackHand = new PokerHand(parseCards("9H TD QD JD KD"), "Black");
        const whiteHand = new PokerHand(parseCards("AC AH AS 8C KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with straight : King");
    });
    it('Black should win with straight flush', function () {

        const blackHand = new PokerHand(parseCards("9D TD QD JD KD"), "Black");
        const whiteHand = new PokerHand(parseCards("AC AH AS 8C KH"), "White");
        
        const outcome = printWinner(blackHand, whiteHand);
        
        expect(outcome).to.equal("Black wins. - with straight flush : King");
    });
});