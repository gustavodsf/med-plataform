/* eslint-disable @typescript-eslint/no-var-requires */
import 'express-async-errors';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import compression from 'compression';

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

import './config/firebase';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(5000).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(5000, () => console.log('Server is running'));
