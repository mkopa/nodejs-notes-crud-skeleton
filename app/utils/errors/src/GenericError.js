'use strict';

const HTTPStatus = require('http-status');

class GenericError {
  constructor(statusCode = HTTPStatus.INTERNAL_SERVER_ERROR, message = 'Undefined') {
    this.code = statusCode;
    this.message = message;
  }

  getError() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

module.exports = GenericError;
