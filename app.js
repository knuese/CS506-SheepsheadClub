let createError = require('http-errors');
let express = require('express');
let firebase = require('firebase');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let config = {
  apiKey: "AIzaSyB2zjYoFr16FOqUDi4KNnr7h1p4d1mcOos",
  authDomain: "sheepshead-test.firebaseapp.com",
  databaseURL: "https://sheepshead-test.firebaseio.com",
  projectId: "sheepshead-test",
  storageBucket: "sheepshead-test.appspot.com",
  messagingSenderId: "860179167527"
};

firebase.initializeApp(config);

let indexRouter = require('./controllers/index');
let scoresRouter = require('./controllers/scores');
let playersRouter = require('./controllers/players');
let staticPageRouter = require('./controllers/staticPages');
let loginRouter = require('./controllers/login');

// Setting up port
const PORT = process.env.PORT || 5500;

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

if (!module.parent) {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
}

module.exports = app;
