import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/api',router);
app.use(globalErrorHandler)

export default app;