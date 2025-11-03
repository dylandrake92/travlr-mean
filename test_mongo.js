// test_mongo.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");
    const dbList = await client.db().admin().listDatabases();
    console.log("Databases:");
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();
