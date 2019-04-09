const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should check for elements on the score entry page', () => {
    it('Has the title', (done) => {
        request(app).get('/enter-scores').end((err, res) => {
            assert(res.text.includes("<h3>Enter Scores</h3>")); 
            done();
        });
    });

    it('Has the player dropdown', (done) => {
        request(app).get('/enter-scores').end((err, res) => {
            assert(res.text.includes(`<select class="form-control" id="player">`)); 
            done();
        });
    });

    it('Has the semester input', (done) => {
        request(app).get('/enter-scores').end((err, res) => {
            assert(res.text.includes(`<input class="form-control" id="semester">`)); 
            done();
        });
    });

    it('Has the date input', (done) => {
        request(app).get('/enter-scores').end((err, res) => {
            assert(res.text.includes(`<input class="form-control" id="date-picker" type="date">`)); 
            done();
        });
    });

    it('Has the score input', (done) => {
        request(app).get('/enter-scores').end((err, res) => {
            assert(res.text.includes(`<input class="form-control" id="score" type="number">`)); 
            done();
        });
    });
});