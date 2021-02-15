export class Client {
  //@ts-ignore
  socket = io("http://localhost:8080", {
    transport: ["websocket", "polling", "flashsocket"],
  });
  sendTest = () => {
    console.log("test sent");
    this.socket.emit("test");
  };
}
