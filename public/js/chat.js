const socket = io();

socket.on("message", msg => {
    console.log("msg: ", msg);
});

const messageForm = document.querySelector("#message-form");
console.log("messageForm: ", messageForm);

messageForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const message = evt.target.elements[0].value;
    console.log("message: ", message);
});
