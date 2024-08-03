const mongoose = require('mongoose')
const logger = require('./logger'); 
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
    process.exit(1);
  }
};

module.exports = connectDB;
