let createError = require('http-errors');
let express = require('express');
let firebase = require('firebase');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let config = {
  apiKey: "AIzaSyCuQwvJ_OrT7cSqv2-J-a_CyJJ9hW7wIPQ",
  authDomain: "sheepshead-7d106.firebaseapp.com",
  databaseURL: "https://sheepshead-7d106.firebaseio.com",
  projectId: "sheepshead-7d106",
  storageBucket: "sheepshead-7d106.appspot.com",
  messagingSenderId: "102887155459"
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    global.loggedIn = true;
  } else {
    global.loggedIn = false;
  }

  console.log(`LOGGED IN ${global.loggedIn}`);
});

let indexRouter = require('./controllers/index');
let scoresRouter = require('./controllers/scores');
let playersRouter = require('./controllers/players');
let staticPageRouter = require('./controllers/staticPages');
let loginRouter = require('./controllers/login');

const errorController = require('./controllers/error');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', scoresRouter);
app.use('/', playersRouter);
app.use('/', staticPageRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorController.get404);

// Setting up port
const port = process.env.PORT || 5500;

app.listen(port, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
});

module.exports = app;
