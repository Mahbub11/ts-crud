import { NextFunction, Request,Response } from "express";


type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
const asyncHandler = (theFunc: AsyncMiddleware) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

  export default asyncHandler;