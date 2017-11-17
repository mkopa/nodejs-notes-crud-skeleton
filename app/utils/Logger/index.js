const Logger = require('./src/Logger');
const Timer = require('./src/Timer');

const defaultLogger = new Logger();

module.exports = Object.assign(defaultLogger, { Logger, Timer });
