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
  // Socket.IO connection
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ userId }) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, message } = data;
      const newMessage = new Message({ senderId, receiverId, message });
      await newMessage.save();
      io.to(receiverId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(port, () => {
    logger("info", "Server", `Server is started on ${port} port`);
  });
};

startServer();
