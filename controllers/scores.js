const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const Player = require('../models/player');
const ScoreEntry = require('../models/scoreEntry');

/* GET scores page */
router.get('/scores', (req, res) => {
    getSemesters().then((semesters) => res.render('scores', { semesters: semesters, admin: firebase.auth().currentUser != null }));
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

router.post('/scores/get-semesters', (req, res) => {
    getSemesters().then((semesters) => res.send({semesters: semesters}));
});

// Get data to display on the scores page
router.post('/scores/get-data', (req, res) => {
    getSemesters();
    let semester = formatSemester(req.body.semester);

    let myPromise = new Promise((resolve, reject) => {
        getScores(semester, resolve, reject);
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
    firebase.firestore().collection('semesters').doc(semester).set({}, {merge: true}); // Add a document for the semester if it doesn't exist in the list
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
    let name = req.body.name.split(' ');
    firebase.firestore().collection('players').add({
        firstName: name[0],
        lastName: name[1],
        semester: formatSemesterPlayerAdd(req.body.semester),
        duesPaid: ""
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
    let players = Array.from(snapshot.docs.map(doc => new Player(doc.id, doc.data().firstName, doc.data().lastName)));
    players.sort((a, b) => {return a.alphabetize(b)});
    return players;
}

// Gets all the semesters for which we have data
async function getSemesters() {
    const snapshot = await firebase.firestore().collection('semesters').get();
    let semesters = Array.from(snapshot.docs.map(d => unformatSemester(d.id)));
    semesters = sortSemesters(semesters);
    return semesters;
}

// Gets the scores from the database and matches them up with the appropriate players
async function getScores(semester, accept, reject) {
    const snapshot = await firebase.firestore().collection(semester).get();
    let playersMap = {};

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
                                let player = new Player(doc.id, doc.data().firstName, doc.data().lastName);
                                playersMap[d.id] = player;
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
                    playersMap[d.id].addScore(new ScoreEntry(doc.id, parseInt(d.data().score)));
                });

                // We don't need the IDs on the front end, so we can drop them
                let players = [];
                Object.keys(playersMap).forEach(key => players.push(playersMap[key]));

                // Once that is done, we call the callback to indicate that we have finished
                accept(players);
            });
        });
    });

    // If we didn't find any documents, send the reject callback
    if (snapshot.docs.length === 0)
        reject();
}

function formatSemesterPlayerAdd(semester) {
    let tokens = semester.split(" ");
    return tokens[0] + ' 20' + tokens[1].substr(1);
}

// Format a semester value to what we use for the keys in the database
function formatSemester(semester) {
    let tokens = semester.split(" ");
    tokens[0] = tokens[0].toLowerCase();
    tokens[1] = tokens[1].substr(1);
    return tokens[0] + tokens[1];
}

// Unformat the semester values from the database
function unformatSemester(semester) {
    let season = semester.startsWith('s') ? 'Spring' : 'Fall';
    let year = semester.substr(semester.length - 2);
    return `${season} '${year}`;
}

// Sorts a list of semesters of the form "Spring '19"
function sortSemesters(semesters) {
    return semesters.sort((a, b) => {
        let aTokens = a.split(' ');
        let bTokens = b.split(' ');
        let aYear = parseInt(aTokens[1].substr(1));
        let bYear = parseInt(bTokens[1].substr(1));

        if (aYear === bYear) {
            if (aTokens[0] === 'Spring') {
                return 1;
            } else {
                return -1;
            }
        } else {
            return bYear - aYear;
        }
    });
}

module.exports = router;