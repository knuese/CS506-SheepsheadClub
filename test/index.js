const request = require('supertest');
const app = require('../app');
const assert = require('assert');

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
