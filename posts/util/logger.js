const path = require('path');

const FILE_NAME = path.join(__dirname, '../logs/app.log');

const logger = require('simple-node-logger').createSimpleLogger({
  logFilePath: FILE_NAME,
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
});

module.exports = { logger };
