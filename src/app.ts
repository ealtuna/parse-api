import "reflect-metadata"; // this shim is required for annotations
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { Application } from "express";
import compression from "compression"; // compresses requests
import session, { MemoryStore } from "express-session";
import { SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import { ParseControllerV1 } from "./controller/parse-controller-v1";
import { ParseControllerV2 } from "./controller/parse-controller-v2";

// Middlewares
import { SuccessInterceptor } from "./middleware/success-interceptor";
import { CustomErrorHandler } from "./middleware/custom-error-handler";

// Services
import { ParseService, ParseServiceImpl } from "./service/parse-service";

// Dependency injection
useContainer(Container);
Container.set("ParseService", new ParseServiceImpl());

// Create Express server
const app: Application = createExpressServer({
  routePrefix: "/api",
  controllers: [ParseControllerV1, ParseControllerV2],
  interceptors: [SuccessInterceptor],
  middlewares: [CustomErrorHandler],
  defaultErrorHandler: false,
  classTransformer: true,
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MemoryStore(),
  })
);

export default app;
