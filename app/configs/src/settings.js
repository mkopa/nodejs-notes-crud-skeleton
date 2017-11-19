'use strict';

const settings = {
  environment: 'dev',
  server: {
    port: 8001,
  },
  sqlite3: {
    dbPath: './sqlite3.db',
    tableName: 'notes',
    testTableName: 'notes_test',
  },
  logDirectory: './log',
};

module.exports = settings;
