"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Capture the stack trace, excluding the constructor call
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
