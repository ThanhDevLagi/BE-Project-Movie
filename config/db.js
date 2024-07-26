const mongoose = require('mongoose')
const logger = require('./logger'); // Assuming logger.js is in the same directory

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/movieapi', {
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
