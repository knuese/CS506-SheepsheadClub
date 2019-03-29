const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should check for elements on the players page', () => {
    it('Has the title', (done) => {
        request(app).get('/players').end((err, res) => {
            assert(res.text.includes("<h3>Players</h3>")); 
            done();
        });
    });

    it('Has the players table', (done) => {
        request(app).get('/players').end((err, res) => {
            assert(res.text.includes(`<table class="table table-hover table-bordered" id="players_table"></table>`)); 
            done();
        });
    });
});