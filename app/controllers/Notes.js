'use strict';

class NotesController {
  static create(req, res, next) {
    res.json({
      pong: true,
    });
    next();
  }
}

module.exports = NotesController;
