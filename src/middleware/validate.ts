import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";

const options: ErrorMessageOptions = {
  delimiter: {
    component: "  ",
    error: " + ",
  },
  path: {
    enabled: true,
    type: "zodPathArray",
    label: "field: ",
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    label: "",
  },
};

type ValidationSchema = {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
  query?: ZodSchema<any>;
};

// a function that takes a zod schema and returns a middleware function
export const validate = (schema: ValidationSchema) => {
  const { body, params, query } = schema;

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (body && req.body) {
        const validatedBody = body.parse(req.body);
        req.body = validatedBody;
      }
      if (params && req.params) {
        const validatedParams = params.parse(req.params);
        req.params = validatedParams;
      }
      if (query && req.query) {
        const validatedQuery = query.parse(req.query);
        req.query = validatedQuery;
      }
      next();
    } catch (error) {
      //check if error is a zod error
      if (error instanceof z.ZodError) {
        //if it is, return a 400 status code and the error message
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: generateErrorMessage(error.issues, options),
        });
      }
      //if it's not, pass the error to the centralized error handler middleware
      return next(error);
    }
  };
};
