require('./app_api/models/db');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// ROUTES – SERVER-SIDE (HBS pages)
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

// ROUTES – API (JSON endpoints)
const apiRoutes = require('./app_api/routes/index');

const app = express();

/* -------------------------------------------
   CORS FIX — REQUIRED FOR ANGULAR (4200 → 3000)
-------------------------------------------- */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* -------------------------------------------
   VIEW ENGINE SETUP (HBS)
-------------------------------------------- */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

/* -------------------------------------------
   MIDDLEWARE
-------------------------------------------- */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* -------------------------------------------
   ROUTES — API FIRST
-------------------------------------------- */
app.use('/api', apiRoutes);

/* -------------------------------------------
   ROUTES — SERVER-SIDE HBS
-------------------------------------------- */
app.use('/', indexRouter);
app.use('/travel', travelRouter);

module.exports = app;
