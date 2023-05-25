import * as express from "express";
import controller from "../code/controller";
export default express
  .Router()
  .post("/", controller.execute)