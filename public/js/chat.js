const socket = io();
console.log("get here?");

socket.on("updateCount", count => {
    console.log("updateCount", count);
});

document.querySelector("#increment").addEventListener("click", () => {
    console.log("increment");
    socket.emit("increment");
});
