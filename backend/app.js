var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize  = require('sequelize');

var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var config = require(path.resolve('config.js'));
var app = express();
var sequelize = new Sequelize(config.get('DATABASE_URL'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.get('SESSION_SECRET')));

// Enable session and connect to database using Sequelize where session information is stored
app.use(session({
  secret: config.get('SESSION_SECRET'),
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 5 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (5 minutes)
    expiration: 4 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session (4 hours)
  }),
  resave: false, // SequelizeStore supports the touch method so per the express-session docs this should be set to false
  saveUninitialized: true,
}));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
