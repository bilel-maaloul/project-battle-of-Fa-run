
function updateBattleElements() {
    middleCell = document.querySelector('.battle');
    redCastleCell= document.querySelector(`.red-castle-cell`);
    blueCastleCell = document.querySelector(`.blue-castle-cell`);
    WarriorImages = middleCell.querySelectorAll('img');
}

async function removeDefeatedWarrior(castle, warrior) {


    if (!warrior.isAlive()) {
       
        castle.warriors = castle.warriors.filter(war => war.id !== warrior.id);

        
        const cell = document.querySelector('.battle');
        const warriorImages = cell.querySelectorAll("img");
        var removedImage = Array.from(warriorImages).find(image => (image.alt.includes(warrior.color)));
        console.log(Array.from(warriorImages))
        if (removedImage) {
            removedImage.remove();
        } else {
            console.log("Warrior image not found in the battle cell.");
        }
    } else {
        console.log("Warrior is still alive.");
    }
}

async function AchieveWarrior(coloredCastle,targetWarrior,Castle){
    displayMessage(`${coloredCastle} ${targetWarrior.type} with ID ${targetWarrior.id} has been defeated!`);
    removeDefeatedWarrior(Castle, targetWarrior);
    await sleep(1000);
    updateBattleElements()
    
    WarriorImages.forEach(image => {
        const alt = image.getAttribute('alt');
        if (alt.includes('red')) {
            redCastleCell.appendChild(image);
        } else {
            blueCastleCell.appendChild(image);
        }
        
    });
}

function moveWarriorsToCastle(color,current_cell,next_cell) {
   
    const warriorImages = current_cell.querySelectorAll('img');
    
    warriorImages.forEach(image => {
        const alt = image.getAttribute('alt');
        if (alt.includes(color)) {
            next_cell.appendChild(image);
        }
    });
}

function countWarriors(castleColor) {
    const castleClass = `${castleColor}-castle-cell `;
    const castleCell = document.querySelector(`.${castleClass}`);
    const warriorImages = castleCell.querySelectorAll('img');
    const coloredWarriors = Array.from(warriorImages).filter(img => img.alt.includes(castleColor));
    return coloredWarriors.length;
}

async function attacks_loop(targetCastleCell, attackerCastle, targetCastle, coloredAttackerCastle, coloredTargetCastle, middleCell) {
    const warriorIDsPicked = new Set();
    var targetWarriorImage = targetCastleCell.querySelector("img");
    for (let index = 0; index < attackerCastle.warriors.length; index++) {
        const Warrior = attackerCastle.warriors[index];
        const AttackerCastleCell = document.querySelector(`.${attackerCastle.color}-castle-cell`);
        let warriorImages;
        let currentIndex = index;
        do {
            warriorImages = Array.from(AttackerCastleCell.querySelectorAll("img")).filter(img => img.alt.endsWith(` ${currentIndex}`))[0];
            currentIndex++;
        } while (!warriorImages  || warriorIDsPicked.has(currentIndex)); 
        
        warriorIDsPicked.add(currentIndex);
        

        if (Warrior.color=='blue' && targetWarriorImage){
            middleCell.appendChild(warriorImages);
            middleCell.appendChild(targetWarriorImage);
        }
        else if (Warrior.color=='red' && targetWarriorImage){
            middleCell.appendChild(targetWarriorImage);
            middleCell.appendChild(warriorImages);
        }
        const targetWarrior = targetCastle.warriors.find(warrior => warrior.isAlive());
        Warrior.attack(targetWarrior);
        displayMessage(`${coloredAttackerCastle} ${Warrior.type} with ID ${Warrior.id} attacked ${coloredTargetCastle} ${targetWarrior.type} with ID ${targetWarrior.id}
        ,health after being hit  ${targetWarrior.hitPoints} `);

        if (!targetWarrior.isAlive()) {
            AchieveWarrior(coloredTargetCastle, targetWarrior, targetCastle);
            targetWarriorImage = targetCastleCell.querySelector("img");
        }
        await sleep(1000);
        moveWarriorsToCastle(attackerCastle.color,middleCell,AttackerCastleCell);
        await sleep(1000);
    }
    moveWarriorsToCastle(targetCastle.color,middleCell,targetCastleCell);
    await sleep(1000);
}
async function endGame(winner, loser, winnerCastleCell, loserCastleCell, middleCell, trainingCell) {
    disableControlButtons();
    displayMessage(`${loser.charAt(0).toUpperCase() + loser.slice(1)} castle cell is empty. ${winner.charAt(0).toUpperCase() + winner.slice(1)} is the winner!`);
    
    moveWarriorsToCastle(winner, winnerCastleCell, middleCell);
    await sleep(1000);
    moveWarriorsToCastle(winner, middleCell, loserCastleCell);
    await sleep(1000);
    moveWarriorsToCastle(winner, loserCastleCell, trainingCell);
}



async function startAttackSequence(blueCastle, redCastle) {
  
    var middleCell = document.querySelector('.battle');
    var redCastleCell = document.querySelector(`.${redCastle.color}-castle-cell`);
    var blueCastleCell = document.querySelector(`.${blueCastle.color}-castle-cell`);
    var redTrainingCell = document.querySelector(`.${redCastle.color}-castle-training.cell`);
    var blueTrainingCell = document.querySelector(`.${blueCastle.color}-castle-training.cell`);
    const coloredBlueCastle = '<span style="color: blue;">Blue</span>';
    const coloredRedCastle = '<span style="color: red;">Red</span>';
    var c1=moveWarriorsFromTrainingToCastle(redCastle);
    var c2=moveWarriorsFromTrainingToCastle(blueCastle);
    if (c1==1 || c2==1){
        await sleep(500);
    }
    
    if (countWarriors('red')==0 && countWarriors('blue')==0) {
        displayMessage("Both castle cells are empty. Place your warriors.");
    } else if (countWarriors('red')==0) {
        await endGame('blue', 'red', blueCastleCell, redCastleCell, middleCell, redTrainingCell);
    } else if ((countWarriors('blue')==0)) {
        await endGame('red', 'blue', redCastleCell, blueCastleCell, middleCell, blueTrainingCell);
    } else {
        disableControlButtons()
        displayMessage("Beginning attack sequence...");
        await attacks_loop(redCastleCell,blueCastle,redCastle,coloredBlueCastle,coloredRedCastle,middleCell)
        updateBattleElements();
        await attacks_loop(blueCastleCell,redCastle,blueCastle,coloredRedCastle,coloredBlueCastle,middleCell)
        adding_resseources(blueCastle,redCastle);
        enableControlButtons()  
    }
       
}

  

