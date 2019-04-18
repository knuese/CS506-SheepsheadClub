const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const Player = require('../models/player');

/* GET players page */
router.get('/players', (req, res, next) => {
    // console.log('here');
    // if (firebase.auth().currentUser) {
      res.render('players', { admin: true, added: false, deleted:false, updated:false});
    // } else {
    //   res.redirect('/login');
    // }
});

router.post('/players', (req, res) => {
    res.redirect('players');
});

router.post('/add-player', (req, res) => {
  let player = req.body ;
  let db = firebase.firestore();
  
  db.collection('players').add({
        firstName: player.firstname,
        lastName: player.lastname,
        semester: player.semester,
        duesPaid: player.duesPaid
    }).then(() => {
        res.render('players', { admin: true, added: true, deleted:false, updated:false});
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});

// Get data to display on the scores page
router.post('/players/get-data', (req, res) => {
    let myPromise = new Promise((resolve, reject) => {
        getData(resolve, reject);
    });

    // The callback we pass in is to send the result with the data
    myPromise.then((players) => {
        res.send({players: players});
    }).catch(() => {
        res.status(500);
        res.send();
    });
});

router.post('/delete-player', (req, res) => {
    let player = req.body ;
    let db = firebase.firestore();
    
    db.collection('players').doc(player.id).delete()
    .then(() => {
          res.render('players', { admin: true, added:false, deleted: true, updated:false});
      }).catch((err) => {
          res.status(500);
          res.statusMessage = err;
          res.send();
      });
  });

  router.post('/update-player', (req, res) => {
    let player = req.body ;
    let db = firebase.firestore();
    
    var updateRef = db.collection("players").doc(player.id);

    return updateRef.update({
        firstName: player.firstname,
        lastName: player.lastname,
        semester: player.semester,
        duesPaid: player.duesPaid
    })
    .then(function() {
        console.log("Document successfully updated!");
        res.render('players', { admin: true, added:false, deleted: false, updated:true});
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
        res.status(500);
        res.statusMessage = error;
        res.send();
    });
    
  });

async function getData(accept, reject) {
    const snapshot = await firebase.firestore().collection('players').get();
    let players = Array.from(snapshot.docs.map(doc => new Player(doc.id, 
                                                                    doc.data().firstName, 
                                                                    doc.data().lastName, 
                                                                    doc.data().semester, 
                                                                    doc.data().duesPaid)));
   // console.log(players);
    accept(players);
}

module.exports = router;
