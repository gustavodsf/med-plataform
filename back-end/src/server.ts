  
import "reflect-metadata";
import "express-async-errors";
import compression from "compression";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

import { router } from "./routes";
import './config/firebase'


require('dotenv').config()

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
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(5000, () => console.log("Server is running"));