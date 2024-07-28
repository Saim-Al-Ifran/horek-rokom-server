import { Request, Response, NextFunction } from 'express';
import CustomError from '../../errors/customError';

const authorizeAdmin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (req.user?.role !== 'admin') {
        return next(new CustomError('Only admin can access', 403));
    }
    next();
};

export default authorizeAdmin;
