const cards = require('../public/js/cards');
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

// Run tests with "npm test"
describe('Should get the cards from the deck', () => {
    it('Should get 32 cards', (done) => {
        assert.equal(cards.length, 32);
        done();
    });

    it('Should get sum of 120 points for cards', (done) => {
        let sum = 0;
        cards.forEach(card => sum += card.pointValue);
        assert.equal(sum, 120);
        done();
    });

    it('Should count 14 trump cards', (done) => {
        let trump = 0;
        cards.forEach(card => {if (card.isTrump) trump++});
        assert.equal(trump, 14);
        done();
    });

    it('Should be able to load images for all the cards', (done) => {
        cards.forEach(card => {
            request(app).get(`/images/cards/${card.code}.png`).expect(200);
        });

        done();
    });
});