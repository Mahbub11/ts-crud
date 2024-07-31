import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors"; // Ensure this is correctly implemented
import ErrorHandler from "../utils/ErrorHandler";
import db from "../utils/db.server"; // Ensure Prisma Client instance is correctly exported

interface User {
  name: string;
  email: string;
}

// Define the route handler function
export const createUser = async (user: User): Promise<User> => {
  const { name, email } = user;
  return db.user.create({
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
