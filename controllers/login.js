let express = require('express');
let router = express.Router();
let firebase = require("firebase");

//login page
router.get('/login', function (req, res, next) {
  if (firebase.auth().currentUser) {
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
      res.redirect('/');
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

module.exports = router;
