'use strict';

const GenericError = require('./GenericError');
const HTTPStatus = require('http-status');

class BadRequestError extends GenericError {
  constructor(message) {
    super(HTTPStatus.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
