import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const message = err.message || 'Server Error Occurred';
  const status = err.status || 500; 

  res.status(status).json({
    message,
    status,
  });
};

export default errorHandler;
