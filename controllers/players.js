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
    var players = [""]
    var jsonStr = '{"player":[]}';
    var obj = JSON.parse(jsonStr);
    var db = firebase.firestore();
   
    var playersRef = db.collection('players');
    var allPlayers = playersRef.get()

 .then(snapshot => {
   snapshot.forEach(doc => {
    obj['player'].push({"playerID":doc.id, "playerData":doc.data()});
    //  console.log(doc.id, '=>', doc.data());
   players.push(doc); 
   });
 })
 .catch(err => {
   console.log('Error getting documents', err);
 });

jsonStr = JSON.stringify(obj);
console.log(players);
res.json(players);
// var docRef = db.collection("cities").doc("SF");
// docRef.get().then(function(doc) {
//    if (doc.exists) {
//        console.log("Document data:", doc.data());
//    } else {
//        // doc.data() will be undefined in this case
//        console.log("No such document!");
//    }
// }).catch(function(error) {
//    console.log("Error getting document:", error);
// });
// // var db = firebase.firestore();
// // const snapshot = firebase.firestore().collection('players').get();
// // res.json({snapshot});    
});

module.exports = router;
