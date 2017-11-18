'use strict';

const GenericError = require('./GenericError');
const HTTPStatus = require('http-status');

class ConflictError extends GenericError {
  constructor(message = 'Conflict') {
    super(HTTPStatus.CONFLICT, message);
  }
}

module.exports = ConflictError;
