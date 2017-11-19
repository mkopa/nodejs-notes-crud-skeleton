'use strict';

const sqlite3 = require('sqlite3');
const { settings } = require('../../configs');
const Logger = require('../../utils/Logger');

class Sqlite3Storage {
  constructor() {
    this.db = new sqlite3.Database(settings.sqlite3.dbPath, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.log('Connected to db');
    });
  }
}

module.exports = Sqlite3Storage;
