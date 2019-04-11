const request = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('Should Login and Logout', () => {
    it('Logs in', (done) => {
        request(app).post('/login')
        .send({email:"sheepshead.test@gmail.com", password:"cs5062019!"})
        .expect(200)
        .end(done);
    });

    it('Has the Enter Score button', (done) => {
        request(app).get('/layout').end((err, res) => {
            assert(res.text.includes(`<button class="btn-block side-button" type="Submit">Enter Scores</button>`)); 
            done();
        });
    });

    it('Has the Manage Player button', (done) => {
        request(app).get('/layout').end((err, res) => {
            assert(res.text.includes(`<button class="btn-block side-button" type="Submit">Manage Players</button>`)); 
            done();
        });
    });
    
    it('Has the logout button', (done) => {
        request(app).get('/layout').end((err, res) => {
            assert(res.text.includes(`<button class="btn-block side-button" type="Submit">Logout</button>`)); 
            done();
        });
    });



    it('Logs out', (done) => {
        request(app).post('/logout')
        .expect(302)
        .end(done);
    });
    
});
