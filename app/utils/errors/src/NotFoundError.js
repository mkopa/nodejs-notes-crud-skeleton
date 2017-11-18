'use strict';

const GenericError = require('./GenericError');
const HTTPStatus = require('http-status');

class NotFoundError extends GenericError {
  constructor(message = 'Not found') {
    super(HTTPStatus.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
