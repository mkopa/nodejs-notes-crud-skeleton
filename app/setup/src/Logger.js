'use strict';

const { Logger } = require('../../utils');
const { logger: loggerSettings } = require('../../configs');

Logger.configure(loggerSettings);

module.exports = Logger;
