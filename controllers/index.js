let express = require('express');
let router = express.Router();
let firebase = require("firebase");

class Announcement {
    constructor(timestamp, posterName, date, content, id) {
        this.timestamp = timestamp;
        this.posterName = posterName;
        this.date = date;
        this.content = content;
        this.id = id;
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  getAnnouncements().then((announcements) => {
      res.render('index', { admin: global.loggedIn, announcements: announcements });
  });
});

router.post('/', function(req, res){
    res.redirect('/');
});

router.post('/submit_post', function(req, res){

    var js_date = new Date();
    var date = js_date.toDateString();
    var timestamp = firebase.firestore.Timestamp.now();

    firebase.firestore().collection('announcements').add({
        timestamp: timestamp.seconds,
        posterName: req.body.posterName,
        date: date,
        content: req.body.content
    }).then(() => {
        res.send("success");
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});

router.post('/update_post', function(req, res){
    firebase.firestore().collection('announcements').doc(req.body.id).update({
        posterName: req.body.posterName,
        content: req.body.content
    }).then(() => {
        res.send("success");
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});

router.post('/delete_post', function(req, res){
    firebase.firestore().collection('announcements').doc(req.body.id).delete().then(() => {
        res.send("success");
    }).catch((err) => {
        res.status(500);
        res.statusMessage = err;
        res.send();
    });

});

async function getAnnouncements() {
    const snapshot = await firebase.firestore().collection('announcements').orderBy('timestamp').get();
    let announcements = Array.from(snapshot.docs.map(doc =>
        new Announcement(doc.data().timestamp, doc.data().posterName, doc.data().date, doc.data().content, doc.id)));
    announcements = announcements.reverse();
    return announcements;
}

module.exports = router;
