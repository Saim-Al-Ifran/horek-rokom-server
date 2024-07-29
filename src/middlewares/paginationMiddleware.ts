import { Response, NextFunction } from 'express';
import CustomError from '../errors/customError'; // Adjust the path to your CustomError module


const paginationMiddleware = (req: any, _res: Response, next: NextFunction): void => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    if (page <= 0 || limit <= 0) {
      return next(new CustomError('Invalid page or limit parameters', 400));
    }

    req.pagination = { page, limit };

    next();
  } catch (error :any) {
    console.error(error.message);
    next(new CustomError('Internal Server Error', 500));
  }
};

export default paginationMiddleware;
