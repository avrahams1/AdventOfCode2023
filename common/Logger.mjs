class LoggerClazz {
    constructor() {
        this.logLevel = LogLevel.INFO;
    }

    info(msg, ...params) {
        if (this.logLevel >= LogLevel.INFO) {
            console.log(msg, ...params);
        }
    }

    debug(msg, ...params) {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.log(msg, ...params);
        }
    }
}

/**
 * @enum {number}
 */
export const LogLevel = {
    NONE: 0,
    INFO: 10,
    DEBUG: 20
}

export const Logger = new LoggerClazz();
