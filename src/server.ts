import 'reflect-metadata';
import './app/shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './app/shared/routes';
import cors from 'cors';
import AppError from './app/shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`
    });
  }
);

app.listen(8081, () => console.log('Running'));
