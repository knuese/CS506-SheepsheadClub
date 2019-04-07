var express = require('express');
var router = express.Router();
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyCuQwvJ_OrT7cSqv2-J-a_CyJJ9hW7wIPQ",
  authDomain: "sheepshead-7d106.firebaseapp.com",
  databaseURL: "https://sheepshead-7d106.firebaseio.com",
  projectId: "sheepshead-7d106",
  storageBucket: "sheepshead-7d106.appspot.com",
  messagingSenderId: "102887155459"
};

firebase.initializeApp(config);

var cards = require('../public/js/cards');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { admin: loggedIn() });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', { admin: loggedIn() });
});

/* GET players page */
router.get('/players', (req, res, next) => {
  console.log('here');
  if (firebase.auth().currentUser) {
    res.render('players', { admin: true });
  } else {
    res.redirect('/login');
  }
});

/* GET rules page */
router.get('/rules', (req, res, next) => {
  res.render('rules', { admin: loggedIn() });
});

/* GET help page */
router.get('/help', (req, res, next) => {
  res.render('help', { cards: cards, admin: loggedIn() });
});

router.post('/', function(req, res){
    res.redirect('/');
});

router.post('/players', (req, res) => {
  res.redirect('players');
});

router.post('/rules', function(req, res){
    res.redirect('rules');
});

router.post('/help', function(req, res){
    res.redirect('help');
});

router.post('/about', function(req, res){
    res.redirect('about');
});

//login page 
router.get('/login', function (req, res, next) {
  res.render('login', {err: ""});
});

router.post('/', function (req, res) {
  res.redirect('/');
});

router.post('/scores', function (req, res) {
  res.redirect('scores');
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

router.post('/login', function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    errorCode = error.code;
    errorMessage = error.message;

    console.log("Error Code: " + errorCode + " \nError Message: " + errorMessage)
    
    res.render('login', {err: errorMessage});
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("logging in");
      res.render('index', { admin: true });
    } else {
      console.log("logged in or error");
    }
   
  });

});

router.post('/logout', function (req, res, next) {

  firebase.auth().signOut().then(function () {

    res.redirect('/');
   
  }).catch(function (error) {
    console.log("Error: " + error);
  });



});

// Check to see if admin user logged in
function loggedIn() {
  return firebase.auth().currentUser != null;
}


module.exports = router;
