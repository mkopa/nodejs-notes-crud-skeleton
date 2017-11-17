const { settings } = require('./app/configs');
const { Logger } = require('./app/setup');
const express = require('express');
const bodyParser = require('body-parser');

// create application
const app = express();

// Connect main middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server
app.listen(settings.server.port, () => {
  Logger.log(`Service started on port ${settings.server.port}`);
});

module.exports = app;
