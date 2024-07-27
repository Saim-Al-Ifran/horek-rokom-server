import { NextFunction } from 'express';
import CustomError from './customError';  

export const handleAsyncError = (error: any, next: NextFunction) => {
      
    const errorMessage = error.message || 'An unknown error occurred during user registration.';
    const statusCode = error.status || 500;
    next(new CustomError(errorMessage, statusCode));

};


// for readability for developers(junior/med) im not using handleAsyncError function 