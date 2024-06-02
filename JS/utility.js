function displayMessage(message) {
    const gameMessagesElement = document.getElementById("game-messages");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message; 
    gameMessagesElement.insertBefore(messageElement, gameMessagesElement.firstChild);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableControlButtons() {
    document.getElementById("player1-train").disabled = true;
    document.getElementById("player2-train").disabled = true;
    document.getElementById("start-attack").disabled = true;
}
function enableControlButtons() {
    document.getElementById("player1-train").disabled = false;
    document.getElementById("player2-train").disabled = false;
    document.getElementById("start-attack").disabled = false;
}