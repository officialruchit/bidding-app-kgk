// Importing required modules and setting up server
const express = require("express"); // Importing Express framework
const app = express(); // Creating Express app instance
const http = require("http"); // Importing HTTP module
const socketIo = require("socket.io"); // Importing Socket.IO for real-time communication
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const db = require("./config"); // Importing database configuration
const User = require("./model/user"); // Importing User model
require("dotenv").config(); // Loading environment variables
const webSocketServer = require("./webSocketServer"); // Importing WebSocket server module
const { verifyToken } = require("./middleware/auth"); // Importing authentication middleware

// Importing route modules
const userRoutes = require("./route/userRoutes");
const itemRoutes = require("./route/itemRoutes");
const bidRoutes = require("./route/bidRoutes");
const notificationRoutes = require("./route/notificationsRoutes");

const PORT = process.env.PORT || 3333; // Setting up port number for server

// Creating HTTP server instance
const server = http.createServer(app);
const io = socketIo(server); // Creating Socket.IO instance for server

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Routing setup
app.use("/items", itemRoutes); // Item routes
app.use("/users", userRoutes); // User routes
app.use("/", bidRoutes); // Bid routes
app.use("/notifications", notificationRoutes); // Notification routes

// WebSocket upgrade event handler
server.on("upgrade", (request, socket, head) => {
  verifyToken(request, {}, (err) => {
    if (err) {
      // Unauthorized access
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    // Handling WebSocket upgrade
    webSocketServer.handleUpgrade(request, socket, head, (ws) => {
      webSocketServer.emit("connection", ws, request);
    });
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log("Server started successfully");
});
