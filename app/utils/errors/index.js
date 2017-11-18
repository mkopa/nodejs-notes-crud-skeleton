const BadRequestError = require('./src/BadRequestError');
const ConflictError = require('./src/ConflictError');
const GenericError = require('./src/GenericError');
const InternalServerError = require('./src/InternalServerError');
const NotFoundError = require('./src/NotFoundError');

module.exports = {
  BadRequestError,
  ConflictError,
  GenericError,
  InternalServerError,
  NotFoundError,
};
