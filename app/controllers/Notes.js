'use strict';

const { Storage } = require('../setup/index');
const errors = require('../utils/errors');


class NotesController {
  static create(req, res, next) {
    const newNote = {
      title: req.body.title,
      message: req.body.message,
    };
    Storage.insertNote(newNote)
      .then(createdNote => res.jsonOk(createdNote))
      .catch(error => next(error));
  }

  static getNotes(req, res, next) {
    Storage.readNotes(req.query.offset, req.query.limit)
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
      .catch((error) => {
        if (error === 'Note not found') {
          return next(new errors.NotFoundError());
        }
        return next(new errors.InternalServerError(error));
      });
  }

  static updateNote(req, res, next) {
    Storage.readNote(req.params.id)
      .then((note) => {
        const noteToUpdate = Object.assign({}, note);
        if (req.body.title) {
          noteToUpdate.title = req.body.title;
        }
        if (req.body.message) {
          noteToUpdate.message = req.body.message;
        }
        return Storage.updateNote(req.params.id, noteToUpdate);
      })
      .then(() => Storage.readNote(req.params.id))
      .then((note => res.jsonOk(note)))
      .catch((error) => {
        if (error === 'Note not found') {
          return next(new errors.NotFoundError());
        }
        return next(new errors.InternalServerError(error));
      });
  }

  static removeNote(req, res, next) {
    Storage.removeNote(req.params.id)
      .then(() => res.jsonOk({ success: true }))
      .catch(error => next(error));
  }
}

module.exports = NotesController;
