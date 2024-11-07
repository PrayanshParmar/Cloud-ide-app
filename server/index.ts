import http from "http";
import express from "express";
import { Server as socketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketServer({
  cors: "*",
});

io.attach(server);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
});

server.listen(9000, () => "🐳 Docker server running");
