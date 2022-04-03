/* eslint-disable no-undef */
import { expect } from 'chai';
import PokerHand from '../models/poker-hand';
import { parseCards, printWinner } from '../app';

describe('Kata PokerHand - printWinner()', () => {
  it('White should win ace with high card', () => {
    const blackHand = new PokerHand(parseCards('2H 3D 5S 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('2C 3H 4S 8C AH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('White wins. - with high card: ACE');
  });
  it('Black should win with full house', () => {
    const blackHand = new PokerHand(parseCards('2H 4S 4C 2D 4H'), 'Black');
    const whiteHand = new PokerHand(parseCards('2S 8S AS QS 3S'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with full house: FOUR over TWO');
  });
  it('Black should win with high card', () => {
    const blackHand = new PokerHand(parseCards('2H 3D 5S 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('2C 3H 4S 8C KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with high card: NINE');
  });
  it('No one should win', () => {
    const blackHand = new PokerHand(parseCards('2H 3D 5S 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('2D 3H 5C 9S KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Tie.');
  });
  it('Black should win with pair', () => {
    const blackHand = new PokerHand(parseCards('2H 2D 5S 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('2C 3H 4S 8C KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with pair: TWO');
  });
  it('Black should win with two pairs', () => {
    const blackHand = new PokerHand(parseCards('2H 2D KS 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('2C 2H 4S 8C 4H'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with two pairs: KING');
  });
  it('White should win with three of kind', () => {
    const blackHand = new PokerHand(parseCards('2H 3D 5S 9C KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('AC AH AS 8C KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('White wins. - with three of kind: ACE');
  });
  it('Black should win with flush', () => {
    const blackHand = new PokerHand(parseCards('9H TD QD JD KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('AC AH AS 8C KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with straight: KING');
  });
  it('Black should win with straight flush', () => {
    const blackHand = new PokerHand(parseCards('9D TD QD JD KD'), 'Black');
    const whiteHand = new PokerHand(parseCards('AC AH AS 8C KH'), 'White');

    const outcome = blackHand.getWinnerOverOponent(whiteHand);
    const cliPrint = printWinner(outcome);

    expect(cliPrint).to.equal('Black wins. - with straight flush: KING');
  });
});
