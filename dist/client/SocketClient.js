"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor() {
        //@ts-ignore
        this.socket = io("http://localhost:8080", {
            transport: ["websocket", "polling", "flashsocket"],
        });
        this.sendTest = () => {
            console.log("test sent");
            this.socket.emit("test");
        };
    }
}
exports.Client = Client;
//# sourceMappingURL=SocketClient.js.map