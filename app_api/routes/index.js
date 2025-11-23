const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define GET /api/trips
router.get('/trips', tripsController.tripsList);

module.exports = router;
