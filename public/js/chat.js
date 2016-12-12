var connection = new WebSocket("ws://10.103.50.197:8000");

window.onload = function () {
    connection.onmessage = function (message) {
        addMessage(message);
    }
};

function sendMessage() {
    var message = document.getElementById("message").value;
    var username = document.getElementById("username").value;
    connection.send(username + ": " + message);
}

function addMessage(message) {
    var chat_body = document.getElementById("chat-body");
    var msg_text = (JSON.parse(message.data).data).replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
    chat_body.innerHTML +=
        "<div class='chat-msg'>" +
        "<p id='msg-user'>" + msg_text.substring(0, msg_text.indexOf(':')) + "</p>" +
        "<p id='msg-text'>" +" "+ msg_text.substring(msg_text.indexOf(':')) + "</p>" +
        "</div>";
    if (msg_text.toLowerCase().includes("gay") ||
        msg_text.toLowerCase().includes("homo") ||
        msg_text.toLowerCase().includes("idiot") ||
        msg_text.toLowerCase().includes("bitch") ||
        msg_text.toLowerCase().includes("ass") ||
        msg_text.toLowerCase().includes("nigga") ||
        msg_text.toLowerCase().includes("shit") ||
        msg_text.toLowerCase().includes("fuck")) {
        chat_body.innerHTML += "<p id='err'>" + "       -Nigga show some respect! PLEASE NOT LEKALEL HERE!" + "</p>";
    }
}