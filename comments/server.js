require('./config/config');
const { logger } = require('./util/logger');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

app.on('db:connected', () => {
  app.listen(4001, () => {
    logger.info('Comments service listening on port ', 4001);
  });
});

module.exports = app;
