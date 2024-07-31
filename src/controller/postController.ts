import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

// Define the route handler function
const showMessage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // Asynchronous operations should be handled within catchAsyncErrors
  res.status(200).json({
    success: true,
    message: 'Sending message',
  });
});

export { showMessage };