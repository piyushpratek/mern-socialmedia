import { JWT_SECRET } from "../config/config";
import User, { IUser } from "../models/userModel";
import jwt from "jsonwebtoken"
import { Response, NextFunction } from 'express'
import { CustomRequest } from "../types";
import { catchAsyncErrors } from "./catchAsyncErrors";
import { HttpStatus } from "../http-status.enum";

export interface JwtPayload {
  _id: string;
  token: string
}

export const isAuthenticated = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = await User.findById(decoded._id) as IUser;

    next();
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
});
