'use strict';

class PingController {
  static ping(req, res, next) {
    const pongResponse = {
      pong: true,
    };
    res.jsonOk(pongResponse);
    next();
  }
}

module.exports = PingController;
