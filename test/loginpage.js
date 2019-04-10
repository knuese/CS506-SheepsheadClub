const request = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('Should check for elements on the login page', () => {
    it('Has the title', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<a id="title" href="/">Sheepshead Club - UW Madison</a>`)); 
            done();
        });
    });

    it('Has the email label', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<label for="email">Email:</label>`)); 
            done();
        });
    });

    it('Has the password label', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<label for="pw">Password:</label>`)); 
            done();
        });
    });

    it('Has the email input', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<input class="form-control" id="email" type="email" placeholder="name@email.com" name="email">`)); 
            done();
        });
    });

    it('Has the password input', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<input class="form-control" id="pw" type="password" name="password">`)); 
            done();
        });
    });

    it('Has the login button', (done) => {
        request(app).get('/login').end((err, res) => {
            assert(res.text.includes(`<button id="login-button" type="submit">Login</button>`)); 
            done();
        });
    });

});
