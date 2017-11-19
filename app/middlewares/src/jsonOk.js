'use strict';

const HTTPStatus = require('http-status');

function jsonOk(data, statusCode = HTTPStatus.OK) {
  const responseFormat = this.req.query.format ? this.req.query.format : 'json';

  if (responseFormat === 'json') {
    this.status(statusCode).json(data);
    return;
  }

  if (responseFormat === 'jsonp') {
    this.status(statusCode).jsonp(data);
    return;
  }

  this.status(HTTPStatus.BAD_REQUEST).json({
    code: HTTPStatus.BAD_REQUEST,
    message: 'Unsuported format',
  });
}

function assignJsonOk(req, res, next) {
  Object.assign(res, { jsonOk });
  next();
}

module.exports = assignJsonOk;
