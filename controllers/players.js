const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const Player = require('../models/player');

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
// Get data to display on the scores page
router.post('/players/get-data', (req, res) => {
if (firebase.auth().currentUser) {
    getPlayers().then((snapshot) => {
        var tmp = [];
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            tmp.push([doc.id,doc.data()]);
          });
          console.log(tmp)
         res.json(tmp);
    });
} else {
    res.redirect('/login');
}
  
});

async function getPlayers() {
    const snapshot = await firebase.firestore().collection('players').get();
    return snapshot;
}

module.exports = router;
