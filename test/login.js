const request = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('Should Login', () => {
    it('Logs in', (done) => {
        request(app).post('/login')
        .send({email:"sheepshead.test@gmail.com", password:"cs5062019!"})
        .expect(200)
        .end(done);
    });

});
