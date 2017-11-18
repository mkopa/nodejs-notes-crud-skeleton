'use strict';

const { Router } = require('express');
const PingController = require('../../controllers/Ping');

const router = new Router();

router.route('/')
  .get((...args) => PingController.ping(...args));

module.exports = router;
