const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should test the scores API', function() {
    this.timeout(5000);

    it('Can get the semester list', (done) => {
        request(app).post('/scores/get-semesters').end((err, res) => {
            assert(res.body.semesters.length > 0, "Should have gotten some semesters but didn't"); 
            done();
        });
    });

    it('Can get the score data for a semester', (done) => {
        request(app).post('/scores/get-data').send({ semester: "Spring '19" }).end((err, res) => {
            let players = res.body.playerScores;

            // Make sure we got something
            assert(players, "Should have gotten score data but didn't");

            // Make sure we got data for a player for which we expect data
            let found = false;
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === "testPlayer1") {
                    found = true;
                    break;
                }
            }

            assert(found, "Should have data for a dummy player in the database"); 
            done();
        });
    });

    let id;

    it('Can add a player to the database', (done) => {
        let name = "John Smith";
        request(app).post('/enter-scores/add-player').send({ name: name, semester: "Spring '19" }).end((err, res) => {
            request(app).get('/enter-scores/get-players').end((err2, res2) => {
                let players = res2.body.players;
                
                // Make sure we got something
                assert(players, "Should have gotten player data but didn't");

                let found = false;
                let exp = name.split(' ');
                for (let i = 0; i < players.length; i++) {
                    if (players[i].firstName === exp[0] && players[i].lastName === exp[1]) {
                        found = true;
                        id = players[i].id;
                        break;
                    }
                }

                assert(found, "Should have found the player we just added but didn't"); 
                done();
            });
        });
    });

    it('Can delete the player we just added', (done) => {
        // DELETE PLAYER
        request(app).post('/delete-player').send({id: id}).end((err, res) => {
            request(app).post('/players/get-data').end((err, res) => {                                            
                let players = res.body.players;
                let found;
                for (let i = 0; i < players.length; i++) {
                    let player = players[i];
                    if (player.fullName == "John Smith") {
                        found = player;
                        break;
                    }
                }

                assert(!found, "John Smith should be gone");

                done();
            });
        });
    });

    it('Should respond with 500 if no name is provided when adding a player', (done) => {
        request(app).post('/enter-scores/add-player').expect(500, done);
    });

    it('Can save a score to the database', (done) => {
        let id = "testPlayer2";
        let score = 10;

        request(app).post('/enter-scores/save-score').send({
            playerId: id,
            semester: "Spring '19",
            date: "2019-03-02",
            score: score
        }).expect(200).end(() => {
            request(app).post('/scores/get-data').send({ semester: "Spring '19" }).end((err, res) => {
                let players = res.body.playerScores;
    
                // Make sure we got something
                assert(players, "Should have gotten score data but didn't");
    
                // Make sure we got data that we just entered
                let found = false;
                for (let i = 0; i < players.length; i++) {
                    if (players[i].id === id && players[i].totalScore === score) {
                        found = true;
                        break;
                    }
                }
    
                assert(found, "Should have data that we just inserted"); 
                done();
            });
        });
    });
});