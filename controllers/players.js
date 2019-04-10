const express = require('express');
const router = express.Router();
const firebase = require('firebase');

/* GET players page */
router.get('/players', (req, res, next) => {
    console.log('here');
    if (firebase.auth().currentUser) {
      res.render('players', { added: false});
    } else {
      res.redirect('/login');
    }
  });

router.post('/players', (req, res) => {
    res.redirect('players');
});

router.post('/addplayer', (req, res) => {
  var player = req.body ;
  var db = firebase.firestore();
  
  db.collection('players').add({
        firstName: player.firstname,
        lastName: player.lastname,
        semester: player.semester
    }).then(() => {
        res.render('players', {added: true});
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});


module.exports = router;