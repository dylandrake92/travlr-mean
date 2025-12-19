const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});
const Trip = mongoose.models.trips || mongoose.model('trips', tripSchema);

// simple user schema (for seeding only) – use the real model if loaded
const userSchema = new mongoose.Schema({
  email: String, name: String, hash: String
});
const User = mongoose.models.users || mongoose.model('users', userSchema);

const bcrypt = require('bcrypt');

const sampleTrips = [
  { code: "HKG2025", name: "Hong Kong City Lights", length: "5 nights", start: "2025-02-10", resort: "Kowloon Harbour", perPerson: "1299", image: "https://via.placeholder.com/640x360?text=Hong+Kong", description: "Skylines, street food, and Star Ferry nights." },
  { code: "ALPS7",   name: "Alpine Ski Week",        length: "7 nights", start: "2025-01-20", resort: "Zermatt",         perPerson: "1899", image: "https://via.placeholder.com/640x360?text=Alps",      description: "Powder runs, fondue, and Matterhorn views." },
  { code: "MAUI4",   name: "Maui Escape",            length: "4 nights", start: "2025-03-15", resort: "Kaanapali",       perPerson: "1499", image: "https://via.placeholder.com/640x360?text=Maui",      description: "Beaches, snorkeling, and Road to Hana." }
];

(async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log(`Connected to ${dbURI}`);

    await Trip.deleteMany({});
    const outT = await Trip.insertMany(sampleTrips);
    console.log(`Seeded ${outT.length} trips`);

    const email = 'admin@example.com';
    const name  = 'Admin';
    const pass  = 'admin123'; // why: class demo default
    const hash  = await bcrypt.hash(pass, 10);
    await User.deleteMany({ email });
    await User.create({ email, name, hash });
    console.log(`Seeded admin user: ${email} / ${pass}`);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();