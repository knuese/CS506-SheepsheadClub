const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should check for elements on the about page', () => {
    it('Has the title', (done) => {
        request(app).get('/about').end((err, res) => {
            assert(res.text.includes("<h3>About</h3>")); 
            done();
        });
    });

    it('Has the semester dropdown', (done) => {
        request(app).get('/scores').end((err, res) => {
            assert(res.text.includes(`<select class="input-small" id="semester">`)); 
            done();
        });
    });

    it('Has the scores table', (done) => {
        request(app).get('/scores').end((err, res) => {
            assert(res.text.includes(`<table class="table table-hover table-bordered" id="scores_table"></table>`)); 
            done();
        });
    });
});