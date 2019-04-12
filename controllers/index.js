let firebase = require("firebase");

exports.post = (req, res, next) => {
  res.redirect('/');
};

exports.getHomePage = (req, res, next) => {
  res.render('index', {
    admin: firebase.auth().currentUser != null
  });
};