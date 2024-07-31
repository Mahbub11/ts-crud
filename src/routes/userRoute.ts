import { Router, Request, Response, NextFunction } from 'express';
import * as userController from '../controller/userController'; // Ensure the path is correct
import catchAsyncErrors from '../middleware/catchAsyncErrors'; // Ensure the path is correct

const router = Router();

// Define the route to create a user
router.post(
  '/',
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    // Use the userController's createUser function to handle the creation logic
    const newUser = await userController.createUser(user);

    // Return the newly created user
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  })
);

export default router;