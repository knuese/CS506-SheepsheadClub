const request = require('supertest');
const app = require('../app');
const assert = require('assert');

// Run tests with "npm test"
describe('Should test the scores API', () => {
    it('Can get the semester list', (done) => {
        request(app).post('/scores/get-semesters').end((err, res) => {
            assert(res.body.semesters.length > 0, "Should have gotten some semesters but didn't"); 
            done();
        });
    });
});