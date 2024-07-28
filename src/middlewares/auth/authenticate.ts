import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../../errors/customError'; 
import { secretKey } from '../../secret'; 
import { findUserByProperty } from '../../services/userService';

interface DecodedToken {
    id: string;
}

const authenticate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        let token = req.cookies.jwt || (authHeader && authHeader.split(' ')[1]);

        if (!token) {
            return next(new CustomError('Unauthorized', 403));
        }
        const decoded = jwt.verify(token, secretKey) as DecodedToken;
        const user = await findUserByProperty('_id', decoded.id);

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
