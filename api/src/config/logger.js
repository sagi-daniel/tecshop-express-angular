const winston = require('winston');
const path = require('path');

const options = {
  console: {
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  },
  file: {
    level: 'info',
    filename: path.join(__dirname, '..', '..', 'app.log'),
    format: winston.format.json()
  }
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file)
  ],
  exitOnError: false
});

module.exports = logger;
