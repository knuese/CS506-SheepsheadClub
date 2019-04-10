const request = require('supertest');
const app = require('../app');

// Run tests with "npm test"
describe('Should get all pages of the website', () => {
    it('GET /', (done) => {
        request(app).get('/').expect(200, done);
    });

    it('GET /login', (done) => {
        request(app).get('/login').expect(200, done);
    });

    it('GET /about', (done) => {
        request(app).get('/about').expect(200, done);
    });

    it('GET /players', (done) => {
        request(app).get('/players').expect(200, done);
    });

    it('GET /rules', (done) => {
        request(app).get('/rules').expect(200, done);
    });

    it('GET /enter-scores', (done) => {
        request(app).get('/enter-scores').expect(200, done);
    });

    it('GET /scores', (done) => {
        request(app).get('/scores').expect(200, done);
    });

    it('GET /help', (done) => {
        request(app).get('/help').expect(200, done);
    });

    it('GET /fun-facts', (done) => {
        request(app).get('/fun-facts').expect(200, done);
    });
});

// Code 302 = redirect
describe('Should redirect when making POST request for pages', () => {
    it('POST /', (done) => {
        request(app).post('/').expect(302, done);
    });

    it('POST /about', (done) => {
        request(app).post('/about').expect(302, done);
    });

    it('POST /players', (done) => {
        request(app).post('/players').expect(302, done);
    });

    it('POST /rules', (done) => {
        request(app).post('/rules').expect(302, done);
    });

    it('POST /enter-scores', (done) => {
        request(app).post('/enter-scores').expect(302, done);
    });

    it('POST /scores', (done) => {
        request(app).post('/scores').expect(302, done);
    });

    it('POST /help', (done) => {
        request(app).post('/help').expect(302, done);
    });
    
    it('POST /logout', (done) => {
        request(app).post('/logout').expect(302, done);
    });

    it('POST /fun-facts', (done) => {
        request(app).post('/fun-facts').expect(302, done);
    });
});

describe('Should respond 404 for nonexistent pages', () => {
    it('GET /foo', (done) => {
        request(app).get('/foo').expect(404, done);
    });
});