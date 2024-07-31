"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_server_1 = __importDefault(require("./utils/db.server"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
// Load environment variables from .env file
dotenv_1.default.config();
// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server for handling uncaught exception');
});
// Configurations
if (process.env.NODE_ENV !== 'PRODUCTION') {
    // Add any non-production specific configurations here
    app_1.default.use((0, morgan_1.default)('dev'));
    app_1.default.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
}
else {
    app_1.default.use((0, morgan_1.default)('combined'));
    app_1.default.use((0, helmet_1.default)());
    app_1.default.use((0, compression_1.default)());
}
// Connect to database
db_server_1.default.$connect()
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log('DB connection failed: ' + err.message);
});
// Create server
const PORT = process.env.PORT || 3000;
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Shutting down the server due to: ${err.message}`);
    console.log('Shutting down the server for unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});
