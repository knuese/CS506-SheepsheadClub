const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const cards = require('../public/js/cards');
const auth = require('../controllers/auth')

// These pages require no DB interaction and are thus being grouped here

/* GET about page */
router.get('/about', (req, res, next) => {
    res.render('about', { admin: auth.isLoggedIn(req) });
  });
  
/* GET rules page */
router.get('/rules', (req, res, next) => {
    res.render('rules', { admin: auth.isLoggedIn(req) });
});

/* GET help page */
router.get('/help', (req, res, next) => {
    res.render('help', { cards: cards, admin: auth.isLoggedIn(req) });
});

/* GET fun facts page */
router.get('/fun-facts', (req, res, next) => {
    res.render('fun-facts', { admin: auth.isLoggedIn(req) });
});

router.post('/rules', function (req, res) {
    res.redirect('rules');
});

router.post('/help', function (req, res) {
    res.redirect('help');
});

router.post('/about', function (req, res) {
    res.redirect('about');
});

router.post('/fun-facts', function (req, res) {
    res.redirect('fun-facts');
});

module.exports = router;