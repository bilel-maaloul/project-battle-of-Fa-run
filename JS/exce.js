document.addEventListener('DOMContentLoaded', () => {
function initializeGame() {
    const blueCastle = new Castle("blue");
    const redCastle = new Castle("red");
    document.getElementById("blue-castle-points").textContent = ` - Remaining Points: ${blueCastle.resources}`;
    document.getElementById("red-castle-points").textContent = ` - Remaining Points: ${redCastle.resources}`;
  

    
    document.getElementById("player1-train").addEventListener("click", () => handleTrainingButtonClick(blueCastle, "player1"));
    document.getElementById("player2-train").addEventListener("click", () => handleTrainingButtonClick(redCastle, "player2"));

   
    document.getElementById("start-attack").addEventListener("click", () => startAttackSequence(blueCastle, redCastle));
}

initializeGame();
});