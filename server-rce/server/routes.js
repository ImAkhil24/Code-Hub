import examplesRouter from "./api/controllers/auth/router";
import authRouter from "./api/controllers/auth/router";
import linkRouter from "./api/controllers/Links/router";
import codeRouter from "./api/controllers/code/router"; 

export default function routes(app) {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/login", authRouter);
  app.use("/link", linkRouter);
  app.use("/code", codeRouter);
}
