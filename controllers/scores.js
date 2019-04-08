var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var Player = require('../models/player');
var ScoreEntry = require('../models/scoreEntry');

/* GET scores page */
router.get('/scores', (req, res, next) => {
    res.render('scores', { admin: firebase.auth().currentUser != null });
});
  
/* GET score entry page */
router.get('/enter-scores', (req, res, next) => {
    //if (firebase.auth().currentUser) {
        getPlayers().then((players) => {
            res.render('enter-scores', { admin: true, players: players });
        });
    //} else {
   //     res.redirect('/login');
   // }
});

router.post('/scores', (req, res) => {
    res.redirect('scores');
});

router.post('/enter-scores', (req, res) => {
    res.redirect('enter-scores');
});

// Get data to display on the scores page
router.post('/scores/get-data', (req, res) => {
    let semester = formatSemester(req.body.semester);

    let myPromise = new Promise((resolve) => {
        getScores(semester, resolve);
    });

    // The callback we pass in is to send the result with the data
    myPromise.then((scores) => {
        res.send({playerScores: scores});
    }).catch(() => {
        res.status(500);
        res.send();
    });
});

// API route to save a score to the database
router.post('/enter-scores/save-score', (req, res) => {
    let semester = formatSemester(req.body.semester);
    firebase.firestore().collection(semester).doc(req.body.date).set({}, {merge: true}); // Create document if it doesn't exist
    firebase.firestore().collection(semester) // Now add the entry for the score
        .doc(req.body.date)
        .collection('scores') // Creates scores collection if it doesn't exist
        .doc(req.body.playerId).set({ // Creates entry for the player
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

// Gets the scores from the database and matches them up with the appropriate players
async function getScores(semester, callback) {
    const snapshot = await firebase.firestore().collection(semester).get();
    let players = {};
    snapshot.docs.map(doc => {
        doc.ref.collection('scores').get().then((scores) => {
            const myPromise = new Promise((resolve) => {
                scores.docs.forEach((d, i, arr) => {
                    const nestedPromise = new Promise((resolve2) => {
                        // Look up all the players we need for this semester
                        firebase.firestore().collection('players')
                            .doc(d.id)
                            .get()
                            .then((doc) => {
                                let player = new Player(doc.id, doc.data().name);
                                players[d.id] = player;
                                resolve2();
                            });
                    });     
                    
                    // Done going through the loop
                    nestedPromise.then(() => {if (i === arr.length - 1) resolve();});
                });
            });

            // The loop has finished getting all the players
            myPromise.then(() => {
                // Now we can read all the scores and add the entries to the players
                scores.docs.map(d => {
                    players[d.id].addScore(new ScoreEntry(doc.id, d.data().score));
                });

                // Once that is done, we call the callback to indicate that we have finished
                callback(players);
            });
        });
    });
}

// Format a semester value to what we use for the keys in the database
function formatSemester(semester) {
    let tokens = semester.split(" ");
    tokens[0] = tokens[0].toLowerCase();
    tokens[1] = tokens[1].substr(1);
    return tokens[0] + tokens[1];
}

module.exports = router;