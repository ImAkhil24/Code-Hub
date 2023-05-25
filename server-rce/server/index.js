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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, visitorid, tempsave"
  );
  next();
});

routes(app);

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
