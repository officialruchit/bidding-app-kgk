const WebSocket = require("ws");
const { Notification } = require("./model/notification");

const webSocketServer = new WebSocket.Server({ noServer: true });

webSocketServer.on("connection", (socket, req) => {
  const userId = req.user.id;

  socket.on("message", async (message) => {
    try {
      const notification = await Notification.create({
        userId,
        message,
      });

      socket.send(JSON.stringify(notification));
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("close", () => {
    console.log(`Connection closed for user ${userId}`);
  });
});

module.exports = webSocketServer;
