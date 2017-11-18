'use strict';

const moment = require('moment');

class Timer {
  constructor(name) {
    this.name = name || '(no name)';
    this.is_working = false;
  }

  start() {
    this.is_working = true;
    this.start_date = Date.now();
  }

  stop() {
    this.is_working = false;
    this.stop_date = Date.now();
  }

  getDuration() {
    const startDate = this.start_date ? this.start_date : 0;
    const stopDate = this.stop_date ? this.stop_date : 0;

    return moment.duration(-(startDate) + (stopDate), 'milliseconds');
  }

  getHumanDuration() {
    const duration = this.getDuration();
    return `${duration.asSeconds()}s`;
  }

  toString() {
    if (this.is_working === true) {
      this.stop();
      this.is_working = true;

      return `Timer ${this.name} is still working (${this.getHumanDuration()})!`;
    } else if (this.is_working === false) {
      return `Timer ${this.name} duration: ${this.getHumanDuration()}`;
    }

    return `Timer ${this.name} was not started yet.`;
  }

  valueOf() {
    return this.toString();
  }
}

module.exports = Timer;
