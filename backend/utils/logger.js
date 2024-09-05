const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const moment = require("moment");
require("winston-daily-rotate-file");

const isEmpty = require("../utils/isEmpty");

const baseLogger = createLogger({
  format: combine(
    winston.format.colorize(),
    winston.format.simple(),
    timestamp(),
    printf(
      ({ level, message, timestamp }) =>
        `${moment(timestamp).format(
          "YYYY-MM-DD HH:mm:ss"
        )} ${level}" ${message}`
    )
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      level: "debug",
      json: true,
      prettyPrint: true,
    }),
    new transports.DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      json: true,
      maxFiles: "30d",
    }),
  ],
  exitOnError: false,
});

const logger = (level, comment, message, req = null) => {
  let agentCode = "";

  if (isEmpty(req)) {
    baseLogger[level](`[ ${comment} ]: ${message}`);
  } else {
    if (req.session.auth) {
      agentCode = req.session.auth.agentCode;
    }
    baseLogger[level](`[ ${comment} ]: (${agentCode})  ${message}`);
  }
};

module.exports = logger;
