const mongoose = require('mongoose');
const { logger } = require('../util/logger');

exports.connect = app => {
  const options = { autoIndex: false };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    logger.info('Connecting to MongoDB');

    mongoose
      .connect(process.env.MONGODB_URI, options)
      .then(() => {
        logger.info('MongoDB is connected');
        app.emit('db:connected');
      })
      .catch(err => {
        logger.error('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
        setTimeout(connectWithRetry, 5000);
      });
  };

  connectWithRetry();
};
