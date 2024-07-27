import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../../errors/customError'; // Adjust the import path as needed
import { secretKey } from '../../secret'; // Adjust the import path as needed
import User from '../../models/User'; // Adjust the import path as needed

interface DecodedToken {
    id: string;
}

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return next(new CustomError('Unauthorized', 403));
        }

        // Verify token
        const decoded = jwt.verify(token, secretKey) as DecodedToken;
        const user = await User.findById(decoded.id );

        if (!user) {
            return next(new CustomError('Unauthorized', 401));
        }

        req.user = user;
        next();

    } catch (err:any) {

        if (err.name === 'TokenExpiredError') {
            return next(new CustomError('Token expired', 401));
        }
        if (err.name === 'JsonWebTokenError' || err.name === 'SyntaxError') {
            return next(new CustomError('Invalid token', 401));
        }

        next(new CustomError('Authentication server problem', 500));
    }
};

export default authenticate;
