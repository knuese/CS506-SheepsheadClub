const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const cards = require('../public/js/cards');

// These pages require no DB interaction and are thus being grouped here

/* GET about page */
router.get('/about', (req, res, next) => {
    res.render('about', { admin: firebase.auth().currentUser != null });
  });
  
/* GET rules page */
router.get('/rules', (req, res, next) => {
    res.render('rules', { admin: firebase.auth().currentUser != null });
});

/* GET help page */
router.get('/help', (req, res, next) => {
    res.render('help', { cards: cards, admin: firebase.auth().currentUser != null });
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

module.exports = router;