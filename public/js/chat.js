const socket = io();
console.log("get here?");

socket.on("updateCount", () => {
    console.log("updateCount");
});

document.querySelector("#increment").addEventListener("click", () => {
    console.log("increment");
    socket.emit("increment");
});
