'use strict';

const { GenericError } = require('../../utils/errors');
const { Logger } = require('../../utils');

const genericError = Object.freeze(new GenericError());

function catchErrors(error, req, res, next) {
  if (error instanceof GenericError) {
    res.status(error.statusCode).json(error.getError());
  } else {
    Logger.debug('catchErrors - not handled error', error);
    res.status(genericError.statusCode).json(genericError.getError());
  }
  next(error);
}

module.exports = catchErrors;
