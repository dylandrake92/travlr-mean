const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single trip
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
