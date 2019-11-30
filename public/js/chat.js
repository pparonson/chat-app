const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#message-input");
const $messageFormButton = $messageForm.querySelector("#message-submit-button");

socket.on("message", msg => {
    console.log("msg: ", msg);
});

const messageForm = document.querySelector("#message-form");

messageForm.addEventListener("submit", evt => {
    // prevent form submit full page refresh
    evt.preventDefault();

    // enforce single message submissions
    $messageFormButton.setAttribute("disabled", "disabled");

    // const message = evt.target.elements[0].value;
    const message = evt.target.elements.message.value;
    socket.emit("sendMessage", message, cbMsg => {
        console.log(cbMsg);
        $messageFormButton.removeAttribute("disabled");

        // clear input msgs
        $messageFormInput.value = "";
    });
});
