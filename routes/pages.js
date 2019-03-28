var express = require('express');
var router = express.Router();
var cards = require('../public/js/cards');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about');
});

/* GET players page */
router.get('/players', (req, res, next) => {
  res.render('players');
});

/* GET rules page */
router.get('/rules', (req, res, next) => {
  res.render('rules');
});

/* GET scores page */
router.get('/scores', (req, res, next) => {
  res.render('scores');
});

/* GET tutorial page */
router.get('/tutorial', (req, res, next) => {
  res.render('tutorial', { cards: cards });
});

router.post('/', function(req, res){
    res.redirect('/');
});

router.post('/scores', function(req, res){
    res.redirect('scores');
});

router.post('/rules', function(req, res){
    res.redirect('rules');
});

router.post('/tutorial', function(req, res){
    res.redirect('tutorial');
});

router.post('/about', function(req, res){
    res.redirect('about');
});

module.exports = router;
