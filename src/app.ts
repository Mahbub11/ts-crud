import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
// import router from "./routes/index";
import ErrorHandler from "./middleware/error";
import router from "./routes/index";

// Load environment variables
dotenv.config();

// Create an Express application
const app: Express = express();

// CORS options
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test route
app.use("/test", (req: Request, res: Response) => {
  res.send("Hello world!");
});

// Route setup
app.use('/api/v1/',router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Use ErrorHandler to format and respond with errors
  ErrorHandler(err, req, res, next);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler(err, req, res, next);
});

// Export the app
export default app;