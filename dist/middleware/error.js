"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const errorHandler = (err, req, res, next) => {
    // Set default status code and message
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Handle MongoDB CastError
    if (err.name === "CastError") {
        const message = `Resource not found with this id. Invalid ${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Handle MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)[0]} entered`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = `Your token is invalid. Please try again later.`;
        err = new ErrorHandler_1.default(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = `Your token has expired. Please try again later.`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Send error response
    res.status(err.statusCode !== undefined ? err.statusCode : 500).json({
        success: false,
        message: err.message,
    });
};
exports.default = errorHandler;
