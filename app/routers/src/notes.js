'use strict';

const { Router } = require('express');
const NotesController = require('../../controllers/Notes');
const NotesValidator = require('../../validators/Notes');

const router = new Router();

router.route('/')
  .post((...args) => NotesValidator.create(...args))
  .post((...args) => NotesController.create(...args))
  .get((...args) => NotesController.getNotes(...args));

router.route('/:id')
  .put((...args) => NotesValidator.updateNote(...args))
  .put((...args) => NotesController.updateNote(...args))
  .get((...args) => NotesValidator.getNote(...args))
  .get((...args) => NotesController.getNote(...args))
  .delete((...args) => NotesValidator.removeNote(...args))
  .delete((...args) => NotesController.removeNote(...args));

module.exports = router;
