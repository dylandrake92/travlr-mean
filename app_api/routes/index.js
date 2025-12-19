const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const auth = require('../controllers/auth'); // <-- this file must exist

// auth endpoints
router.post('/login', auth.login);
router.post('/users/register', auth.register);

// trips: GETs are public; write ops require JWT
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);
router.post('/trips', auth.requireAuth, ctrlTrips.tripsAddTrip);
router.put('/trips/:tripCode', auth.requireAuth, ctrlTrips.tripsUpdateTrip);
router.delete('/trips/:tripCode', auth.requireAuth, ctrlTrips.tripsDeleteTrip);

module.exports = router;