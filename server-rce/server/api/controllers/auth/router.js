import * as express from "express";
import controller from "./controller";
import isLoggedIn from "../../middlewares/isLogged.handler.js";
import googleLogin from "../../middlewares/googleLogin.js";

export default express
  .Router()
  .post("/google", googleLogin, controller.execute)
  .post("/", controller.execute)
  .get("/", isLoggedIn, controller.fetchUser);
