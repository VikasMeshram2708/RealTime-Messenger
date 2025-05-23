// index.ts
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

const port = process.env.PORT || 5000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chat", (msg: { userId: string | undefined; text: string }) => {
    console.log(`Message : ${msg}`);
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
