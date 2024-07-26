const mongoose = require('mongoose')
const logger = require('./logger'); // Assuming logger.js is in the same directory
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Kết nối CSDL thành công.');
  } catch (err) {
    logger.error(`Không thể kết nối CSDL: ${err}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
