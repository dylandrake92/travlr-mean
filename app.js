require('./app_api/models/db');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRoutes = require('./app_api/routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  return req.method === 'OPTIONS' ? res.sendStatus(204) : next();
});

app.use('/api', apiRoutes);
app.use('/', indexRouter);
app.use('/travel', travelRouter);

module.exports = app;
