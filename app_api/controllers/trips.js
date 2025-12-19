// FILE: app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (_req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    return res.status(200).json(trips);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const code = req.params.tripCode;
    const trip = await Trip.find({ code }).lean();
    if (!trip || trip.length === 0) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(trip);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.start) payload.start = new Date(payload.start);
    const created = await Trip.create(payload);
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const code = req.params.tripCode;
    const payload = { ...req.body };
    if (payload.start) payload.start = new Date(payload.start);
    const updated = await Trip.findOneAndUpdate({ code }, payload, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const code = req.params.tripCode;
    const del = await Trip.findOneAndDelete({ code }).lean();
    if (!del) return res.status(404).json({ message: 'Trip not found' });
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };
