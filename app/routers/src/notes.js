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
  .put((...args) => NotesController.updateNote(...args))
  .get((...args) => NotesController.getNotes(...args))
  .delete((...args) => NotesController.removeNote(...args));

module.exports = router;
