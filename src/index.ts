import app from './app';
import db from './utils/db.server';
import dotenv from 'dotenv';
import morgan from "morgan";
import helmet from 'helmet';
import compression from 'compression'

// Load environment variables from .env file
dotenv.config();

// Handling uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server for handling uncaught exception');
});

// Configurations
if (process.env.NODE_ENV !== 'PRODUCTION') {
  // Add any non-production specific configurations here
  app.use(morgan('dev'));
  app.use(helmet({ contentSecurityPolicy: false }));
}else{
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(compression());
}

// Connect to database
db.$connect()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err: Error) => {
    console.log('DB connection failed: ' + err.message);
  });

// Create server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Shutting down the server due to: ${err.message}`);
  console.log('Shutting down the server for unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  });
});