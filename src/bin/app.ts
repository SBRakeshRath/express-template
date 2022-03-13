import express from "express";
const app = express();
import { Request, Response, NextFunction } from "express";
const port = 3000;

import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import CustomError from "../models/error";
import corsOptions from './cors' ;
import router from '../router/router.map';
app.use(
  cors(corsOptions)
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router

app.use(router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new CustomError(404));
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // custom error

  if (err instanceof CustomError) {
    res.status(err.status);
    res.json({ code: err.code, message: err.message, status: err.status });
    return;
  }

  res.status(500);
  res.json({ code: "INTERNAL_ERROR", message: "unknown error", status: 500 });
});

export default app;
