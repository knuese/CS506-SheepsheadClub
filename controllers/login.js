let express = require('express');
let router = express.Router();
let firebase = require("firebase");
const auth = require('./auth');

//login page
router.get('/login', function (req, res, next) {
  if (auth.isLoggedIn(req)) {
    res.redirect('/');
  } else {
    res.render('login', {err: "", admin: false});
  }
});

router.post('/login', function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

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
      auth.login(req);
      res.redirect('/');
    } else {
      console.log("logged in or error");
    }

  });

});

router.post('/logout', function (req, res, next) {

  firebase.auth().signOut().then(function () {
    auth.logout(req);
    res.redirect('/');

  }).catch(function (error) {
    console.log("Error: " + error);
  });

});

module.exports = router;
