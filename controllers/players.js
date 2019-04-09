const express = require('express');
const router = express.Router();
const firebase = require('firebase');

/* GET players page */
router.get('/players', (req, res, next) => {
    //if (firebase.auth().currentUser) {
      res.render('players', { admin: true });
    // } else {
    //   res.redirect('/login');
    // }
  });

router.post('/players', (req, res) => {
    res.redirect('players');
});

module.exports = router;