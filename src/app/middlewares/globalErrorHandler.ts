/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZoderror';
import { ZodError } from 'zod';
import handleValidationError from '../errors/handleValoidationError';
import handleDuplicateError from '../errors/handleDuplicateError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //console.log(err);
    let statusCode = 401;
    let message = 'Something went wrong!';
    let error: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof ZodError) {
        console.log("ami zod error")
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
        console.log("ami validate error")
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    }else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        error = simplifiedError?.errorSources;
      }
    else if (err instanceof AppError) {
        console.log("ami app error");
        statusCode = err?.statusCode;
        message = err.message;
        error = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        error = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: err?.stack,
    });
};

export default globalErrorHandler;
