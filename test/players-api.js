const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should test the players API', function() {
    this.timeout(5000);

    it('Can get the get the player list', (done) => {
        request(app).post('/players/get-data').end((err, res) => {
            assert(res.body.players.length > 0, "Should have gotten some players but didn't"); 
            done();
        });
    });

    let firstName = "Tom";
    let lastName = "Jones";
    let semester = "Spring '19";
    let duesPaid = "04-12-2019";
    let id;

    it('Can add a player to the player list', (done) => {
        request(app).post('/add-player').send({firstname: firstName, lastname: lastName, semester: semester, duesPaid: duesPaid})
        .end((err, res) => {
            request(app).post('/players/get-data').end((err, res) => {
                    assert(res.body.players.length > 0, "Should have gotten some players but didn't"); 
                    

                    let players = res.body.players;
                    let found;
                    for (let i = 0; i < players.length; i++) {
                        let player = players[i];
                        if (player.firstName == firstName && player.lastName == lastName && player.semester == semester && player.duesPaidDate == duesPaid) {
                            found = player;
                            break;
                        }
                    }

                    assert(found, "Should find player we just added");

                    id = found.id;
                    done();                  
                });
            });
    });

    it('Can update the player we just added', (done) => {
        // Update the player
        request(app).post('/update-player').send({id: id, firstname: firstName, lastname: 'Thompson', semester: semester, duesPaid: duesPaid})
        .end((err, res) => {
            request(app).post('/players/get-data').end((err, res) => {
                assert(res.body.players.length > 0, "Should have gotten some players but didn't"); 
                    
                let players = res.body.players;
                let found;
                for (let i = 0; i < players.length; i++) {
                    let player = players[i];
                    if (player.firstName == firstName && player.lastName == 'Thompson' && player.semester == semester && player.duesPaidDate == duesPaid) {
                        found = player;
                        break;
                    }
                }

                assert(found, "Should find the player we just updated");
                done();
            })
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
                    if (player.firstName == firstName && player.lastName == 'Thompson' && player.semester == semester && player.duesPaidDate == duesPaid) {
                        found = player;
                        break;
                    }
                }

                assert(!found, "Should not find the player we just deleted");

                done();
            });
        });
    });
});
