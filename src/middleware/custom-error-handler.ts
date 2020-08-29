import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

import logger from "../util/logger";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, request: Request, response: Response, next: NextFunction) {
        const statusCode = error.httpCode || 500;
        logger.error(`Error ${error.name} in http request ${statusCode} ${error.message}`);
        response.status(statusCode);
        response.send({ statusCode });
        next();
    }
}