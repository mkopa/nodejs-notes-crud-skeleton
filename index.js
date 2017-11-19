'use strict';

const { settings } = require('./app/configs');
const { Logger } = require('./app/setup');
const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./app/routers');
const { jsonOk, catchErrors } = require('./app/middlewares');

// create application
const app = express();

// Connect main middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jsonOk);
app.use(appRouter);
app.use(catchErrors);

// Start server
const server = app.listen(settings.server.port, () => {
  Logger.log(`Service started on port ${settings.server.port}`);
});

module.exports = server;
