const Timer = require('./Timer');
const dateFormat = require('dateformat');
const util = require('util');

const nooperation = () => Promise.resolve(false);
const defaultWrapper = (...args) => args.map((arg) => {
  const typeOf = typeof arg;
  if (['string'].indexOf(typeOf) >= 0) {
    return arg;
  }

  return util.inspect(arg, { showHidden: false, depth: null });
});

class Logger {
  constructor(out = console, settings = {}) {
    this.out = out;
    this.logWrapper = settings.logWrapper || defaultWrapper;
  }
  log(...args) {
    const wrapped = this.logWrapper(...args);
    return Promise.resolve(this.out.log(...wrapped));
  }

  debug(...args) {
    const wrapped = this.logWrapper(...args);
    return Promise.resolve(this.out.log(...wrapped));
  }

  warn(...args) {
    const wrapped = this.logWrapper(...args);
    return Promise.resolve(this.out.warn(...wrapped));
  }

  error(...args) {
    const wrapped = this.logWrapper(...args);
    return Promise.resolve(this.out.error(...wrapped));
  }

  /* eslint-disable */
  startTimer(name) {
    const timer = new Timer(name);
    timer.start();
    return timer;
  }
  /* eslint-enable */

  configure({ levels = [], format = {} }) {
    ['log', 'warn', 'debug', 'error'].forEach((method) => {
      if (!levels[method]) {
        Logger[method] = nooperation;
      } else if (format && format.addLevel) {
        Logger[method] = (oldMethod =>
          (...args) => oldMethod(...[`[${method.toUpperCase()}]`, ...args])
        )(Logger[method]);
      }
    });
    if (format.datetime) {
      this.logWrapper = (externalWrapper =>
        (...args) => {
          const nowString = dateFormat(new Date(), format.datetime);
          const preArgs = externalWrapper(...args);
          return [
            `[${nowString}]`,
            ...preArgs,
          ];
        }
      )(this.logWrapper);
    }
  }
}

module.exports = Logger;
