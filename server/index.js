const express = require("express");
const { server } = require("socket.io");

const io = new server();
const app = express();

app.use(express.json());

const emailToSocketMapping = new map();

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User ", emailId, " joined ", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

app.listen(8000, () => {
  console.log("HTTP server running at port 8000");
});

io.listen(8001);
