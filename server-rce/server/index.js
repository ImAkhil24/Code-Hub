import "./common/env";
import Server from "./common/server";
import routes from "./routes";
import database from "./database";
import bodyParser from "body-parser";
const Express = require("express");
const app = new Express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8000",
  }
})
import cors from "cors";



database();
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,OPTIONS,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-access-token, visitorid, tempsave"
//   );
//   next();
// });
app.use(cors());

io.on("connection", (socket) => {
  console.log(socket.rooms);

  socket.on("joinRoom", (roomId, token, name) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("userConnected", token, socket.id, name);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("userDisconnected", token);
    });
  });

  socket.on("sendNewUser", (token, socketId, name) => {
    socket.to(socketId).emit("fromOldUser", token, name);
  });

  interviewSocketIO(socket);
});

routes(app);

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
