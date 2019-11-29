const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
// explicitly create express web server
const server = http.createServer(app);
// pass server to socketio
const io = socketio(server);

const public = path.join(__dirname, "../public");
app.use(express.static(public));

io.on("connection", socket => {
    console.log("A new user web socket connection established");
    socket.emit("message", "Welcome!");

    // socket.on("increment", () => {
    //     console.log("a client increment was triggered");
    //     count++;
    //     socket.emit("updateCount", count);
    // });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
