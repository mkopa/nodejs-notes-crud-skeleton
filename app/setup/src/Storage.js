'use strict';

const { Storage } = require('../../storage');
const { settings } = require('../../configs');

const storage = new Storage(settings.sqlite3.tableName);

module.exports = storage;
