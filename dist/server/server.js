"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const app = express_1.default();
const port = process.env.PORT || 8080;
app.set("port", port);
let http = require("http").Server(app);
let io = require("socket.io")(http);
/* const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
 */
app.use(express_1.default.static(path.join(__dirname, "../client")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./dist/client/index.html"));
});
const server = http.listen(port, function () {
    console.log("listening on port ", port);
});
server.lastPlayerID = 0;
io.on("connection", function (socket) {
    socket.on("newplayer", function () {
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100, 400),
            y: randomInt(100, 400),
        };
        socket.emit("allplayers", getAllPlayers());
        socket.broadcast.emit("newplayer", socket.player);
        socket.on("move", function (data) {
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
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player)
            players.push(player);
    });
    return players;
}
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
//# sourceMappingURL=server.js.map