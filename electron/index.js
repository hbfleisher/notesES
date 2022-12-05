function sendMsg() {
    let first_message = document.getElementById('first_message').textContent
    window.api.sendMessage(first_message);
}

function closeApp() {
    window.api.closeApp();
}
        