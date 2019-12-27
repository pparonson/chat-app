const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#message-input");
const $messageFormButton = $messageForm.querySelector("#message-submit-button");
const $messages = document.querySelector("#messages");
// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const messageForm = document.querySelector("#message-form");

// Options
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.on("message", msg => {
    console.log(`MSG: ${msg.user}, ${msg.text}, ${msg.createdAt}`);
    const html = Mustache.render(messageTemplate, {
        username: msg.user.username,
        msg: msg.text,
        createdAt: moment(msg.createdAt).format("YYYYMMDD hh:mma")
    });
    $messages.insertAdjacentHTML("beforeend", html);
});

messageForm.addEventListener("submit", evt => {
    // prevent form submit full page refresh
    evt.preventDefault();

    // enforce single message submissions
    $messageFormButton.setAttribute("disabled", "disabled");

    // const message = evt.target.elements[0].value;
    const message = evt.target.elements.message.value;
    socket.emit("sendMessage", message, cbMsg => {
        $messageFormButton.removeAttribute("disabled");

        if (cbMsg) {
            console.log(`cbMsg: ${cbMsg}`);
        }

        // clear input msgs
        $messageFormInput.value = "";
        $messageFormInput.focus();
    });
});

socket.emit("join", { username, room }, error => {
    if (error) {
        // console.log("Error: ", error);
        alert(`Error: ${error}`);
        location.href = "/";
    }
});
