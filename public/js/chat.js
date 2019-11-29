const socket = io();

socket.on("message", msg => {
    console.log("msg: ", msg);
});

const messageForm = document.querySelector("#message-form");

messageForm.addEventListener("submit", evt => {
    // prevent form submit full page refresh
    evt.preventDefault();
    // const message = evt.target.elements[0].value;
    const message = evt.target.elements.message.value;
    console.log("message: ", message);
    socket.emit("sendMessage", message);
});
