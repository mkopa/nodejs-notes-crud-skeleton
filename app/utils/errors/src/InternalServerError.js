'use strict';

const GenericError = require('./GenericError');
const HTTPStatus = require('http-status');

class InternalServerError extends GenericError {
  constructor(message = 'Undefined') {
    super(HTTPStatus.INTERNAL_SERVER_ERROR, message);
  }
}

module.exports = InternalServerError;
