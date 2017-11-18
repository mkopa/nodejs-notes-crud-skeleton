'use strict';

class PingController {
  static ping(req, res, next) {
    res.jsonOk({
      pong: true,
    });
    next();
  }
}

module.exports = PingController;
