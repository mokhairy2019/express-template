import config from "../config/config";
// const logger = require("../config/logger"); //TODO: add logger
import ApiError from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import IResponse from "../types/Response";

//this middleware converts the error to ApiError, if needed it will be called before the "errorHandler" middleware
export const errorConverter = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const userMessage = "something went wrong";
    const devMessage = err.message || httpStatus[statusCode];
    const stack = err.stack || "";
    error = new ApiError(statusCode, userMessage, devMessage, false, stack); //if the error is not an instance of ApiError, it must be a non-operational error.
  } else if (error instanceof ApiError) {
    if (!error.userMessage) {
      error.userMessage = "something went wrong";
    }
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //TODO: add logging for all errors here

  let response: IResponse = {
    success: false,
    message: err?.userMessage ?? "something went wrong!!!",
  };

  if (config.env === "development") {
    response.stack = err.stack;
    response.devMessage = err.message;
    res.locals.errorMessage = err.message;
  }

  res.status(err.statusCode).send(response);

  if (!err.isOperational) {
    //TODO: add extra logging or dev team alerting here
    //you might need to restart the server here as best practice
  }
};
