const request = require('supertest');
const app = require('../app');
const assert = require('assert');
let firebase = require("firebase");
// Run tests with "npm test"
describe('Should check for elements on the homepage', () => {
    it('Has the Scores card', (done) => {
        request(app).get('/').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">Scores</h3>'));
            done();
        });
    });

    it('Has the Cheat Sheet card', (done) => {
        request(app).get('/').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">Cheat Sheet</h3>'));
            done();
        });
    });

    it('Has the Tutorials card', (done) => {
        request(app).get('/').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">Help</h3>'));
            done();
        });
    });

    it('Has the About card', (done) => {
        request(app).get('/').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">About</h3>'));
            done();
        });
    });

    it('Has the Announcements card', (done) => {
        request(app).get('/').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">Announcements</h3>'));
            done();
        });
    });
});

describe('Should test the API for the homepage', () => {
    it('Can add an announcement to the database', (done) => {
        request(app).post('/submit_post')
        .send({ posterName: "API Tester", content: "add announcement test" })
        .end((err, res) => {
            request(app).get('/').end((err, res) => {
                assert(res.text.includes('<b> API Tester</b>'));
                assert(res.text.includes('<p class="announcement-content">add announcement test</p>'));

                firebase.firestore().collection('announcements').where("content", "==", "add announcement test").get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        firebase.firestore().collection('announcements').doc(doc.id).delete();
                    });
                });
                done();
            });
        });
    });

    it('Can Remove an announcement from the database', (done) => {

        firebase.firestore().collection('announcements').add({
            timestamp: 000000,
            posterName: "Remove Test",
            date: "Test",
            content: "remove announcement test"
        }).then((doc) => {
            request(app).get('/').end((err, res) => {
                assert(res.text.includes('<b> Remove Test</b>'));
                assert(res.text.includes('<p class="announcement-content">remove announcement test</p>'));
                request(app).post('/delete_post')
                .send({ id: doc.id})
                .end((err, res) => {
                    request(app).get('/').end((err, res) => {
                        assert(!res.text.includes('<b> Remove Test</b>'));
                        assert(!res.text.includes('<p class="announcement-content">Test</p>'));
                        done();
                    });
                });
            });

        }).catch((err) => {
            res.status(500);
            res.statusMessage = err;
            res.send();
        });
    });
});
