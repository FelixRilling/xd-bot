import * as winston from "winston";
import { isProductionMode } from "./mode";

const rootLogger = winston.createLogger({
    level: isProductionMode() ? "info" : "debug",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (!isProductionMode()) {
    rootLogger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

export { rootLogger };
