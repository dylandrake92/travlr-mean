const mongoose = require('mongoose');
const Trip = require('./travlr');
const tripsData = require('../../data/trips.json');

// Database connection string
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connect to MongoDB
mongoose.connect(dbURI);

mongoose.connection.on('connected', async () => {
  console.log('Connected to Mongo, seeding trips collection...');

  try {
    // Clear existing trips
    await Trip.deleteMany({});

    // Insert new trips
    await Trip.insertMany(tripsData);
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    try {
      console.log('Closing connection...');
      await mongoose.connection.close();   // Updated for Mongoose v7+
      console.log('Connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error closing connection:', err);
      process.exit(1);
    }
  }
});
