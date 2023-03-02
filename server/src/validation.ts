import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (request: Request, response: Response, next: NextFunction) => {
  const validationErrors = validationResult(request);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => `${error.param} ${error.msg}}`);
    return response.status(400).json(errors);
  } else {
    return next();
  }
};