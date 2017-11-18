'use strict';

const { Router } = require('express');
const notes = require('./src/notes');
const ping = require('./src/ping');

const router = new Router();

router.use('/v1/ping', ping);
router.use('/v1/notes', notes);

module.exports = router;
