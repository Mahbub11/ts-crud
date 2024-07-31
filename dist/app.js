"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import router from "./routes/index";
const error_1 = __importDefault(require("./middleware/error"));
const index_1 = __importDefault(require("./routes/index"));
// Load environment variables
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
// CORS options
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
// Middleware setup
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Test route
app.use("/test", (req, res) => {
    res.send("Hello world!");
});
// Route setup
app.use('/api/v1/', index_1.default);
app.use((err, req, res, next) => {
    // Use ErrorHandler to format and respond with errors
    (0, error_1.default)(err, req, res, next);
});
// Error handling middleware
app.use((err, req, res, next) => {
    (0, error_1.default)(err, req, res, next);
});
// Export the app
exports.default = app;
