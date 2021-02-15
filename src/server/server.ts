import express from "express";
import * as path from "path";
const app = express();
const port = process.env.PORT || 8080;
app.set("port", port);
let http = require("http").Server(app);
let io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());
app.get("/", (req: any, res: any) => {
  res.send("Socket IO server");
  console.log("");
});

const server = http.listen(port, function () {
  console.log("listening on port ", port);
});
server.lastPlayerID = 0;
io.on("connection", function (socket: any) {
  socket.on("newplayer", function () {
    socket.player = {
      id: server.lastPlayderID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400),
    };
    socket.emit("allplayers", getAllPlayers());
    socket.broadcast.emit("newplayer", socket.player);

    socket.on("move", function (data: any) {
      console.log("move to " + data.x + ", " + data.y);
      socket.player.x = data.x;
      socket.player.y = data.y;
      io.emit("move", socket.player);
    });

    socket.on("disconnect", function () {
      io.emit("remove", socket.player.id);
    });
  });

  socket.on("test", function () {
    console.log("test received");
  });
});

function getAllPlayers() {
  var players: any = [];
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}

function randomInt(low: number, high: number) {
  return Math.floor(Math.random() * (high - low) + low);
}
