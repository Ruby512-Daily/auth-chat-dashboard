const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const compression = require("compression");
const apiRouter = require("./routes");
const loaders = require("./loaders");
const logger = require("./utils/logger");
const { port } = require("./config/key");

const app = express();

app.set("views", path.join(__dirname, "views"));

const server = http.createServer(app);

const startServer = async () => {
  app.use(express.static(path.join(__dirname, "public")));

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  // Set Middleware to process error
  app.use((err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
      res.status(403).send("CSRF Attack Detected");
    } else if (err instanceof SyntaxError) {
      res.status(400).send("JSON PARSER ERROR");
    } else {
      next(err);
    }
  });

  app.use("/api", apiRouter);

  await loaders({ app });

  //socket server for chat

  const socketIo = require("socket.io");
  const io = socketIo(server);
  const Message = require("./models/chatApp");
  let users = {};
  // Handle new connections
  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    // Listen for login event to store user info
    socket.on("login", (username) => {
      users[socket.id] = username;
      io.emit("userList", Object.values(users)); // Send updated user list to all clients
    });

    // Listen for messages
    socket.on("send_message", ({ message, recipient }) => {
      const recipientSocket = Object.keys(users).find(
        (key) => users[key] === recipient
      );
      if (recipientSocket) {
        io.to(recipientSocket).emit("receive_message", {
          message,
          sender: users[socket.id],
        });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
      delete users[socket.id];
      io.emit("userList", Object.values(users)); // Update user list on disconnection
    });
  });

  server.listen(port, () => {
    logger("info", "Server", `Server is started on ${port} port`);
  });
};

startServer();
