'use strict';

const settings = {
  environment: 'dev',
  server: {
    port: 8001,
  },
  sqlite3: {
    dbPath: process.env.NOTES_DB_PATH ? process.env.NOTES_DB_PATH : './sqlite3_dev.db',
    tableName: 'notes',
  },
  logDirectory: './log',
};

module.exports = settings;
