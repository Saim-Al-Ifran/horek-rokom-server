import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { nodeEnv } from './secret';
import errorHandler from './errors/defaultError';


const app = express();
 
if(nodeEnv !== 'production'){
    app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use(errorHandler);

export default app;
 
