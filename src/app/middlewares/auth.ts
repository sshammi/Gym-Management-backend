/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //console.log("passing role",role);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized access.');
    }
    let decoded;
    try {
       decoded= jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED,'Unauthorized')
    }
    //console.log(decoded.role);
    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'Access denied.'
        );
      }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;