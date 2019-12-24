const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { generateMessage } = require("../utils/messages");
const usersUtil = require("../utils/users");

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
    // // socket.emit broadcasts to new client only
    // socket.emit("message", generateMessage("Welcome!"));
    // // socket.broadcast.emit broadcasts to all clients except socket.emit client
    // socket.broadcast.emit(
    //     "message",
    //     generateMessage("A new client has joined")
    // );

    socket.on("join", ({ username, room }, cb) => {
        console.log(`username: ${username}, room: ${room}`);
        const { error, user } = usersUtil.addUser({
            id: socket.id,
            username,
            room
        });
        if (error) {
            // return to stop execution
            return cb(error);
        }

        socket.join(user.room);
        // send msg to clients in a room
        // io.to.emit();
        // socket.broadcast.to()

        // socket.emit broadcasts to new client only
        socket.emit("message", generateMessage("Welcome!"));
        // socket.broadcast.emit broadcasts to all clients except socket.emit client
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                generateMessage(`${user.username} has joined ${user.room}`)
            );

        // success
        cb();
    });

    socket.on("sendMessage", (message, cbConfirmMsg) => {
        console.log(
            "A new client message has been received by the server: ",
            message
        );
        // io obj broadcasts to all clients
        io.emit("message", generateMessage(message));
        cbConfirmMsg("Message delivered");
    });

    // disconnect features are handled by socket.io library
    socket.on("disconnect", () => {
        const user = usersUtil.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit(
                "message",
                generateMessage(`${user.username} has left room ${user.room}`)
            );
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
