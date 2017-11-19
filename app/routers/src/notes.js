'use strict';

const { Router } = require('express');
const NotesController = require('../../controllers/Notes');

const router = new Router();

router.route('/')
  .post((...args) => NotesController.create(...args))
  .get((...args) => NotesController.getNotes(...args));

router.route('/:id')
  .put((...args) => NotesController.updateNote(...args))
  .get((...args) => NotesController.getNotes(...args))
  .delete((...args) => NotesController.removeNote(...args));

module.exports = router;
