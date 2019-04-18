const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should check for elements on the about page', () => {
    it('Has the About the Club card', (done) => {
        request(app).get('/about').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">About the Club</h3>'));
            done();
        });
    });

    it('Has the Club Officers card', (done) => {
        request(app).get('/about').end((err, res) => {
            assert(res.text.includes('<h3 class="card-title">Club Officers</h3>'));
            done();
        });
    });

    /*
    it('Has the UW logo img', (done) => {
        request(app).get('/about').end((err, res) => {
            assert(res.text.includes('<img src="/images/badger_logo.png" class="logo">'));
            done();
        });
    });
    */
});