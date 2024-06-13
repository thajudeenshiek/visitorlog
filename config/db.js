const mongoose = require('mongoose');

mongoose.Promise = Promise;

const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;