'use strict';

const { Router } = require('express');
const NotesController = require('../../controllers/Notes');

const router = new Router();

router.route('/')
  .post((...args) => NotesController.create(...args));

module.exports = router;
