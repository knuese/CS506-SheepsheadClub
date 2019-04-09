let express = require('express');
let router = express.Router();
let firebase = require("firebase");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { admin: firebase.auth().currentUser != null });
});

router.post('/', function(req, res){
    res.redirect('/');
});

module.exports = router;