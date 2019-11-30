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
    // socket.emit broadcasts to new client only
    socket.emit("message", "Welcome!");
    // socket.broadcast.emit broadcasts to all clients except socket.emit client
    socket.broadcast.emit("message", "A new client has joined");

    socket.on("sendMessage", (message, cbConfirmMsg) => {
        console.log(
            "A new client message has been received by the server: ",
            message
        );
        // io obj broadcasts to all clients
        io.emit("message", message);
        cbConfirmMsg("Message delivered");
    });

    // disconnect features are handled by socket.io library
    socket.on("disconnect", () => {
        io.emit("message", "A client has disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
