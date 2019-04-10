const assert = require('assert');
const Player = require('../models/player');
const ScoreEntry = require('../models/scoreEntry');

describe('Should be able to create a new player', () => {
    let id = 'ABC123';
    let firstName = 'John'
    let lastName = 'Smith'
    let player = new Player(id, firstName, lastName);

    it('New player has the correct ID', (done) => {
        assert(player.id === id, 'ID was not set correctly');
        done();
    });

    it('New player has the correct name', (done) => {
        assert(player.firstName === firstName, 'First name was not set correctly');
        assert(player.lastName === lastName, 'Last name was not set correctly');
        assert(player.fullName === firstName + ' ' + lastName, 'Full name was not set correctly');
        done();
    });

    it('New player has no score entries', (done) => {
        assert(player.scores.length === 0, 'Score entries should be empty but were not');
        done();
    });

    it('New player has a total score of 0', (done) => {
        assert(player.totalScore === 0, 'Total score should be 0 but was ' + player.totalScore);
        done();
    });
});

describe('Should be able to add score entries to a player', () => {
    let id = 'ABC123';
    let firstName = 'John';
    let lastName = 'Smith'
    let player = new Player(id, firstName, lastName);

    it('Should be able to add a new score entry to a player', (done) => {
        let scoreEntry = new ScoreEntry('2019-04-09', 100);
        player.addScore(scoreEntry);

        assert(player.totalScore === 100, "Player's total score should be 100 but is " + player.totalScore);
        assert(player.scores.length === 1, "Player should have 1 score entry but has " + player.scores.length);
        done();
    });

    it("Should update player's total score properly when a new entry is added", (done) => {
        let scoreEntry = new ScoreEntry('2019-03-09', -10);
        player.addScore(scoreEntry);

        assert(player.totalScore === 90, "Player's total score should be 90 but is " + player.totalScore);
        assert(player.scores.length === 2, "Player should have 2 score entries but has " + player.scores.length);
        done();
    });
});

describe('Should be able to sort players correctly by name', () => {
    let aaron = new Player('123', 'Aaron', 'Adams');
    let beth = new Player('234', 'Beth', 'Bowman');
    let chris = new Player('345', 'Chris', 'Carter');

    it('Should return -1 when person 1 comes before person 2 alphabetically', (done) => {
        assert(aaron.alphabetize(beth) === -1, 'Should return -1');
        assert(beth.alphabetize(chris) === -1, 'Should return -1');
        assert(aaron.alphabetize(chris) === -1, 'Should return -1');
        done();
    });

    it('Should return 0 when person 1 equals person 2 alphabetically', (done) => {
        assert(aaron.alphabetize(aaron) === 0, 'Should return 0');
        assert(beth.alphabetize(beth) === 0, 'Should return 0');
        assert(chris.alphabetize(chris) === 0, 'Should return 0');
        done();
    });

    it('Should return 1 when person 1 comes after person 2 alphabetically', (done) => {
        assert(chris.alphabetize(aaron) === 1, 'Should return 1');
        assert(beth.alphabetize(aaron) === 1, 'Should return 1');
        assert(chris.alphabetize(beth) === 1, 'Should return 1');
        done();
    });
});
