'use strict';

const sqlite3 = require('sqlite3');
const { settings } = require('../../configs');
const Logger = require('../../utils/Logger');

class Sqlite3Storage {
  constructor(tableName) {
    this.db = new sqlite3.Database(settings.sqlite3.dbPath, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.log('Connected to db');
    });
    this.tableName = tableName;
  }

  insertNote(note) {
    return new Promise((resolve, reject) => {
      const dbWorker = this.db.prepare(`INSERT into ${this.tableName}(title, message, create_date, modified_date) VALUES
        ('${note.title}', '${note.message}', ${note.createDate}, ${note.modifiedDate})`)
        .run((err) => {
          if (err) {
            reject(err.message);
            return;
          }
          const insertedNote = Object.assign({ id: dbWorker.lastID }, note);
          resolve(insertedNote);
        });
    });
  }

  updateNote(id, note) {
    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE ${this.tableName} SET title = '${note.title}', message = '${note.message}', 
        modified_date = ${note.modifiedDate} WHERE id = ${id}`, (err) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve();
      });
    });
  }

  readNote(id) {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * from ${this.tableName} WHERE id = ${id}`, (err, rows) => {
        if (err) {
          reject(err.message);
          return;
        }
        if (rows.length === 0) {
          const notFoundMessage = 'Note not found';
          reject(notFoundMessage);
          return;
        }
        resolve(rows[0]);
      });
    });
  }

  readNotes() {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * from ${this.tableName}`, (err, rows) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(rows);
      });
    });
  }

  removeNote(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.tableName} WHERE id = ${id}`, (err) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve();
      });
    });
  }

  removeAllNotes() {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.tableName}`, (err) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = Sqlite3Storage;
