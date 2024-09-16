import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { nodeEnv } from './secret';
import errorHandler from './errors/defaultError';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import router from './routes/index';

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml')); 

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
if(nodeEnv !== 'production'){
    app.use(morgan('dev'));
}
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(router);


app.use(errorHandler);

export default app;
 
