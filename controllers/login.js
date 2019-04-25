let express = require('express');
let router = express.Router();
let firebase = require("firebase");
var admin = require('firebase-admin');

var serviceAccount = require(__dirname+'/../public/sheepshead-test-firebase-adminsdk-77rq4-55c963a2ea.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sheepshead-test.firebaseio.com"
});


//login page
router.get('/login', function (req, res, next) {
  res.render('login', {err: "", admin: false});
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


router.post('/session', function (req, res, next) {
// Verify the ID token while checking if the token is revoked by passing
// checkRevoked true.

  firebase.auth().currentUser.getIdToken()
    .then((idToken) => {
        // idToken can be passed back to server.
      let checkRevoked = true;
      admin.auth().verifyIdToken(idToken, checkRevoked)
        .then(payload => {
          // Token is valid.
          res.status(200);
          res.send();
        })
        .catch(error => {
          if (error.code == 'auth/id-token-revoked') {
            // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
            res.status(404);
            res.send();
          } else {
            // Token is invalid.
            res.status(404);
            res.send();
          }
        })
        ;

    })
    .catch((error) => {
      // Error occurred.
    });


});

module.exports = router;
