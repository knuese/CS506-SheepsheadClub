const request = require('supertest');
const app = require('../app');

describe('Should get all pages of the website', () => {
    it('GET /', (done) => {
        request(app).get('/').expect(200, done);
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

    it('GET /scores', (done) => {
        request(app).get('/scores').expect(200, done);
    });

    it('GET /tutorial', (done) => {
        request(app).get('/tutorial').expect(200, done);
    });
});

describe('Should respond 404 for nonexistent pages', () => {
    it('GET /foo', (done) => {
        request(app).get('/foo').expect(404, done);
    });
});