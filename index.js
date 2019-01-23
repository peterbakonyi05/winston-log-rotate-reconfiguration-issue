const winston = require("winston");
require("winston-daily-rotate-file");

// Imagine this config is coming from a JSON file and every X minutes we check if the content of that file changed.
// If changed, config is reset (example: DevOps Engineer changed the log level on one of the servers where there is an issue)
function getWinstonConfiguration() {
    return {
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' }),
            // note: happens with both `File` and `DailyRotateFile` transports
            // new winston.transports.DailyRotateFile({
            //     filename: 'logs/application.log',
            //     datePattern: 'YYYY-MM-DD-HH',
            //     zippedArchive: true,
            //     maxSize: '20m',
            //     maxFiles: '14d'
            // })
        ]
    };
}


let logger = winston.createLogger(getWinstonConfiguration());
logger.info("app started");

setTimeout(() => {
    // reconfiguration
    logger.configure(getWinstonConfiguration());

    // note: the below 2 lines work as expected as an alternative
    // logger.close();
    // logger = winston.createLogger(getWinstonConfiguration());

    // next log causes a fatal exception
    logger.info("app config changed");
}, 3000);