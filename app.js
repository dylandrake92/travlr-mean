require('./app_server/models/db');

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

// ----- VIEW ENGINE SETUP (HBS) -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// ----- MIDDLEWARE -----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----- SERVER-SIDE ROUTES -----
app.use('/', indexRouter);
app.use('/travel', travelRouter);

// ----- API ROUTES -----
app.use('/api', apiRoutes);   // <---- THIS FIXES /api/trips

module.exports = app;
