const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io")
const cors = require("cors")
const app = express()
const authRouter = require("./routes/auth.js")
const chatRouter = require("./routes/chat.js")
require("dotenv").config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/auth", authRouter)
app.use("/", chatRouter)

app.get("/", (req, res) => {
    res.send("listening")
})

const server = app.listen(process.env.PORT)

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


const users = {}; // Keeps track of user IDs and their socket IDs

io.on("connection", (socket) => {

  // Listen for user ID when they connect
  socket.on("add-user", (userId) => {
    users[userId] = socket.id;
  });

  // Handle message sending
  socket.on("send-message", (data) => {
    const { from, to, message } = data;
    const recipientSocketId = users[to];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("message-receive", { sender: from, message });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Remove user from users object
    for (let [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});