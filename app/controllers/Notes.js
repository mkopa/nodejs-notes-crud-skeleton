'use strict';

const { Storage } = require('../setup/index');

class NotesController {
  static create(req, res, next) {
    const createTimestamp = Date.now();
    const newNote = {
      title: req.body.title,
      message: req.body.message,
      createDate: createTimestamp,
      modifiedDate: createTimestamp,
    };
    Storage.insertNote(newNote)
      .then(createdNote => res.jsonOk(createdNote))
      .catch(error => next(error));
  }

  static getNotes(req, res, next) {
    Storage.readNotes()
      .then((notes) => {
        const allNotes = {
          count: notes.length,
          results: notes,
        };
        res.jsonOk(allNotes);
      })
      .catch(error => next(error));
  }

  static getNote(req, res, next) {
    Storage.readNote(req.params.id)
      .then(note => res.jsonOk(note))
      .catch(error => next(error));
  }

  static removeNote(req, res, next) {
    Storage.removeNote(req.params.id)
      .then(() => res.jsonOk({ success: true }))
      .catch(error => next(error));
  }
}

module.exports = NotesController;
