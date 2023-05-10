import "./common/env";
import Server from "./common/server";
import routes from "./routes";
import database from "./database";
import bodyParser from "body-parser";
const Express = require("express");
const app = new Express();
const http = require("http").Server(app);

database();
app.use(bodyParser.json());
routes(app);

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
