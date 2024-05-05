document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript code here
    
   // Function to update the castle cell with the warrior image
   function updateCastleCell(castle, warriorType) {
    const castleCell = document.querySelector(`.${castle.color}-castle-training`);
    let warriorImageSrc;

    // Determine the image source based on the castle's color and the warrior type
    switch (warriorType) {
        case "nain":
            warriorImageSrc = `images_warriors/${castle.color === "blue" ? "NB" : "NR"}.png`;
            break;
        case "elfe":
            warriorImageSrc = `images_warriors/${castle.color === "blue" ? "EB" : "ER"}.png`;
            break;
        case "chef-nain":
            warriorImageSrc = `images_warriors/${castle.color === "blue" ? "CNB" : "CNR"}.png`;
            break;
        case "chef-elfe":
            warriorImageSrc = `images_warriors/${castle.color === "blue" ? "CEB" : "CER"}.png`;
            break;
        default:
            console.log("Invalid warrior type selected.");
            return;
    }

    // Clear the castle cell before adding new warrior images
   

    // Create an image element for the warrior
    const warriorImage = document.createElement("img");
    warriorImage.src = warriorImageSrc;
    warriorImage.alt = warriorType + ' ' + castle.color;
    warriorImage.classList.add("warrior-image");

    // Append the warrior image to the castle cell
    castleCell.appendChild(warriorImage);
}

    

// Function to display game messages
function displayMessage(message) {
    // Log message to console
    console.log(message);

    // Append message to HTML element
    const gameMessagesElement = document.getElementById("game-messages");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message; // Use innerHTML to parse HTML tags
    gameMessagesElement.insertBefore(messageElement, gameMessagesElement.firstChild);
}




// Modify the trainWarrior function to assign IDs and display messages with colored text
function trainWarrior(castle, warriorType) {
    let warrior;
    switch (warriorType) {
        case "nain":
            warrior = new Warrior("Nain", castle.color);
            break;
        case "elfe":
            warrior = new Warrior("Elfe", castle.color);
            break;
        case "chef-nain":
            warrior = new Warrior("Chef Nain", castle.color);
            break;
        case "chef-elfe":
            warrior = new Warrior("Chef Elfe", castle.color);
            break;
        default:
            displayMessage("Invalid warrior type selected.");
            return;
    }

    // Train the warrior using setTeam method and update the castle cell only if training was successful
    if (castle.setTeam([warrior])) {
        updateCastleCell(castle, warriorType); // Update the castle cell with the warrior image
        const coloredCastle = castle.color === 'blue' ? '<span style="color: blue;">Blue</span>' : '<span style="color: red;">Red</span>';
        const message = `Trained ${coloredCastle} ${warriorType} with ID ${warrior.id} successfully at Castle ${coloredCastle}, Remaining resources after training: ${castle.resources}.`;
        displayMessage(message);
    } else {
        displayMessage(`Not enough resources to train ${warriorType} at Castle ${castle.color}.`);
    }
}




// Function to handle the training process when a button is clicked
function handleTrainingButtonClick(castle, player) {
    const selectElement = document.getElementById(`${player}-warrior`);
    const selectedWarrior = selectElement.value;
    trainWarrior(castle, selectedWarrior);
}

function moveWarriorsFromTrainingToCastle(castle) {
    const trainingGround = document.querySelector(`.${castle.color}-castle-training`);
    const castleCell = document.querySelector(`.${castle.color}-castle-cell`);

    // Check if training ground and castle cell exist
    if (!trainingGround || !castleCell) {
        console.error("Training ground or castle cell not found.");
        return 0
    }

    // Iterate over warrior images in the training ground
    const warriorImages = trainingGround.querySelectorAll("img");
    warriorImages.forEach(warriorImage => {
        // Move the warrior image to the castle cell
        castleCell.appendChild(warriorImage);
        return 1
    });
}


// Function to start the attack sequence

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startAttackSequence(blueCastle, redCastle) {

    
    const redCastleCell = document.querySelector(`.${redCastle.color}-castle-cell`);
    const blueCastleCell = document.querySelector(`.${blueCastle.color}-castle-cell`);

    var c1=moveWarriorsFromTrainingToCastle(redCastle);
    var c2=moveWarriorsFromTrainingToCastle(blueCastle);
    if (c1==1 || c2==1){
    await sleep(1000);
    }
    const isRedCastleCellEmpty = redCastleCell.childElementCount === 0;
    const isBlueCastleCellEmpty = blueCastleCell.childElementCount === 0;

    if (isRedCastleCellEmpty && isBlueCastleCellEmpty) {
        displayMessage("Both castle cells are empty. No action taken.");
    } else if (isRedCastleCellEmpty) {
        displayMessage("Red castle cell is empty. Blue is the winner!");
        // Display message for blue victory
    } else if (isBlueCastleCellEmpty) {
        displayMessage("Blue castle cell is empty. Red is the winner!");
    } else {
        displayMessage("Beginning attack sequence...");

        const targetRedWarrior = redCastle.warriors.find(redWarrior => redWarrior.isAlive());
        const middleCell = document.querySelector('.battle');

        const warriorImages_red = redCastleCell.querySelector("img");
        const targetRedWarriorImage = warriorImages_red;

       

        for (let index = 0; index < blueCastle.warriors.length; index++) {
            const blueWarrior = blueCastle.warriors[index];

            

            const blueCastleCell = document.querySelector(`.${blueCastle.color}-castle-cell`);
            const warriorImages_blue = blueCastleCell.querySelector("img");
            const targetBlueWarriorImage = warriorImages_blue;

            if (targetBlueWarriorImage && middleCell) {
                middleCell.appendChild(targetBlueWarriorImage);
            }
            if (targetRedWarriorImage && middleCell) {
                middleCell.appendChild(targetRedWarriorImage);
            }
      
            const targetRedWarrior = redCastle.warriors.find(redWarrior => redWarrior.isAlive());
            blueWarrior.attack(targetRedWarrior);
            const coloredBlueCastle = '<span style="color: blue;">Blue</span>';
            const coloredRedCastle = '<span style="color: red;">Red</span>';
            displayMessage(`${coloredBlueCastle} ${blueWarrior.type} with ID ${blueWarrior.id} attacked ${coloredRedCastle} ${targetRedWarrior.type} with ID ${targetRedWarrior.id}`);

            if (!targetRedWarrior.isAlive()) {
                displayMessage(`${coloredRedCastle} ${targetRedWarrior.type} with ID ${targetRedWarrior.id} has been defeated!`);
                removeDefeatedWarrior(redCastle, targetRedWarrior);
                await sleep(2000);
                const middleCellAfterBlueAttack = document.querySelector('.battle');
                const redCastleCellAfterBlueAttack = document.querySelector(`.${redCastle.color}-castle-cell`);
                const blueCastleCellAfterBlueAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
                const redWarriorImages = middleCellAfterBlueAttack.querySelectorAll('img');
                redWarriorImages.forEach(image => {
                    const alt = image.getAttribute('alt');
                    if (alt.includes('red')) {
                        redCastleCellAfterBlueAttack.appendChild(image);
                    } else {
                        blueCastleCellAfterBlueAttack.appendChild(image);
                    }
                });
                return 0;
            }

           
            await sleep(2000);
            const middleCellAfterAttack = document.querySelector('.battle');
            const blueCastleCellAfterAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
            const blueWarriorImages = middleCellAfterAttack.querySelectorAll('img');
            blueWarriorImages.forEach(image => {
                const alt = image.getAttribute('alt');
                if (alt.includes('blue')) {
                   
                    blueCastleCellAfterAttack.appendChild(image);
                }
               
            });
            await sleep(2000);
        }

       

        const middleCellAfterBlueAttack = document.querySelector('.battle');
        const redCastleCellAfterBlueAttack = document.querySelector(`.${redCastle.color}-castle-cell`);
        const blueCastleCellAfterBlueAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
        const redWarriorImages = middleCellAfterBlueAttack.querySelectorAll('img');
        redWarriorImages.forEach(image => {
            const alt = image.getAttribute('alt');
            if (alt.includes('red')) {
                redCastleCellAfterBlueAttack.appendChild(image);
            } else {
                blueCastleCellAfterBlueAttack.appendChild(image);
            }
        });

        if (middleCellAfterBlueAttack) {
            middleCellAfterBlueAttack.innerHTML = '';
        }
        await sleep(2000);
       
    
        const middleCellBeforeRedAttack = document.querySelector('.battle');

        const blueCastleCellBeforeRedAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
        const warriorImages_blue = blueCastleCellBeforeRedAttack.querySelector("img");
        const targetBlueWarriorImage = warriorImages_blue;

        if (targetBlueWarriorImage && middleCellBeforeRedAttack) {
            middleCellBeforeRedAttack.appendChild(targetBlueWarriorImage);
        }

        for (let index = 0; index < redCastle.warriors.length; index++) {
            const redWarrior = redCastle.warriors[index];


            const redCastleCell = document.querySelector(`.${redCastle.color}-castle-cell`);
            const warriorImages_red = redCastleCell.querySelector("img");
            const targetRedWarriorImage = warriorImages_red;

            if (targetRedWarriorImage && middleCellBeforeRedAttack) {
                middleCellBeforeRedAttack.appendChild(warriorImages_red);
            }

            const targetBlueWarrior = blueCastle.warriors.find(blueWarrior => blueWarrior.isAlive());
            redWarrior.attack(targetBlueWarrior);
            const coloredBlueCastle = '<span style="color: blue;">Blue</span>';
            const coloredRedCastle = '<span style="color: red;">Red</span>';
            displayMessage(`${coloredRedCastle} ${redWarrior.type} with ID ${redWarrior.id} attacked ${coloredBlueCastle} ${targetBlueWarrior.type} with ID ${targetBlueWarrior.id}`);

            if (!targetBlueWarrior.isAlive()) {
                displayMessage(`${coloredBlueCastle} ${targetBlueWarrior.type} with ID ${targetBlueWarrior.id} has been defeated!`);
                removeDefeatedWarrior(blueCastle, targetBlueWarrior);
                await sleep(2000);
                const middleCellAfterBlueAttack = document.querySelector('.battle');
                const redCastleCellAfterBlueAttack = document.querySelector(`.${redCastle.color}-castle-cell`);
                const blueCastleCellAfterBlueAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
                const redWarriorImages = middleCellAfterBlueAttack.querySelectorAll('img');
                redWarriorImages.forEach(image => {
                    const alt = image.getAttribute('alt');
                    if (alt.includes('red')) {
                        redCastleCellAfterBlueAttack.appendChild(image);
                    } else {
                        blueCastleCellAfterBlueAttack.appendChild(image);
                    }
                });
                return 0;
            }

            await sleep(2000);

            const middleCellAfterRedAttack = document.querySelector('.battle');
            const redCastleCellAfterRedAttack = document.querySelector(`.${redCastle.color}-castle-cell`);
            const blueCastleCellAfterRedAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
            const redWarriorImagesAfterRedAttack = middleCellAfterRedAttack.querySelectorAll('img');
            redWarriorImagesAfterRedAttack.forEach(image => {
                const alt = image.getAttribute('alt');
                if (alt.includes('red')) {
                    redCastleCellAfterRedAttack.appendChild(image);
                }
               
            });
            await sleep(2000);
        }

        const middleCellAfterAttack = document.querySelector('.battle');
        const blueCastleCellAfterAttack = document.querySelector(`.${blueCastle.color}-castle-cell`);
        const blueWarriorImages = middleCellAfterAttack.querySelectorAll('img');
        blueWarriorImages.forEach(image => {
            const alt = image.getAttribute('alt');
            if (alt.includes('blue')) {
               
                blueCastleCellAfterAttack.appendChild(image);
            }
           
        });
    }
}


function removeDefeatedWarrior(castle, warrior) {
    const index = castle.warriors.findIndex(war => war.id === warrior.id);

    // Check if the warrior is alive before removing them
    if (!warrior.isAlive()) {
        // Remove the defeated warrior from the castle's warriors list
        castle.warriors = castle.warriors.filter(war => war.id !== warrior.id);

        // Remove the corresponding image using the alt attribute
        const cell = document.querySelector('.battle');
        const warriorImages = cell.querySelectorAll("img");
        const removedImage = Array.from(warriorImages).find(image => image.alt.includes(warrior.color));
        console.log(removedImage)
        if (removedImage) {
            removedImage.remove();
        } else {
            console.log("Warrior image not found in the battle cell.");
        }
    } else {
        console.log("Warrior is still alive.");
    }
}




     
    // Function to initialize the game
    function initializeGame() {
        const blueCastle = new Castle("blue");
        const redCastle = new Castle("red");

        // Event listeners for player 1 and player 2 training buttons
        document.getElementById("player1-train").addEventListener("click", () => handleTrainingButtonClick(blueCastle, "player1"));
        document.getElementById("player2-train").addEventListener("click", () => handleTrainingButtonClick(redCastle, "player2"));

        // Event listener for start attack button
        document.getElementById("start-attack").addEventListener("click", () => startAttackSequence(blueCastle, redCastle));
    }

    // Function to start the attack sequence

    // Call initializeGame to start the game
    initializeGame();
});
