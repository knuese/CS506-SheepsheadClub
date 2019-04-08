var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var Player = require('../models/player');

/* GET scores page */
router.get('/scores', (req, res, next) => {
    res.render('scores', { admin: firebase.auth().currentUser != null });
});
  
/* GET score entry page */
router.get('/enter-scores', (req, res, next) => {
    if (firebase.auth().currentUser) {
        getPlayers().then((players) => {
            res.render('enter-scores', { admin: true, players: players });
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/scores', (req, res) => {
    res.redirect('scores');
});

router.post('/enter-scores', (req, res) => {
    res.redirect('enter-scores');
});

// API route to save a score to the database
router.post('/enter-scores/save-score', (req, res) => {
    firebase.firestore().collection('players')
        .doc(req.body.playerId)
        .collection('scores') // Creates scores collection if it doesn't exist
        .doc(req.body.date).set({ // Creates entry for the provided date
            semester: req.body.semester,
            score: req.body.score
        }).then(() => {
            res.send();
        }).catch((err) => {
            res.status(500);
            res.statusMessage = err;
            res.send();
        });
});

// API route to save a played added from the "Quick Add" area
router.post('/enter-scores/add-player', (req, res) => {
    firebase.firestore().collection('players').add({
        name: req.body.name
    }).then(() => {
        res.send();
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});

// Loads the players from the database
async function getPlayers() {
    const snapshot = await firebase.firestore().collection('players').get();
    let players = Array.from(snapshot.docs.map(doc => new Player(doc.id, doc.data().name)));
    players.sort((a, b) => {return a.compare(b)});
    return players;
}

module.exports = router;