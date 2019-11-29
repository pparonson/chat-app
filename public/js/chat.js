const socket = io();
console.log("get here?");

socket.on("updateCount", () => {
    console.log("updateCount");
});
