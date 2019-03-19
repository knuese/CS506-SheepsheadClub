var express = require('express');
var router = express.Router();

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
  res.render('tutorial');
});

//login page 
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
