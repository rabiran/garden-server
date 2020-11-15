const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const { handleHttpError } = require('./helpers/errorHandler.js');
const app = express();
const passport = require("passport");
const shraga = require('./helpers/passport');
const { checkAuth, shragaCallback, getAuth } = require('./controllers/shraga');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', checkAuth);
app.use(express.static(path.join(__dirname, '../build')));

app.get('/auth', getAuth)
app.get('/shraga', passport.authenticate("shraga", { session: false }), (req,res,next) => {
  // user will not get here and will be redirected to shraga instance configured.
});

app.post('/auth/callback/',  passport.authenticate("shraga", { session: false }), shragaCallback);

app.use('/api', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// error handler
app.use((err, req, res, next) => {
  handleHttpError(err, res);
});

module.exports = app;
