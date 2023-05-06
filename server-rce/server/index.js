import "./common/env";
import Server from "./common/server";
import routes from "./routes";
import database from "./database";

database();

export default new Server().router(routes).listen(process.env.PORT);
