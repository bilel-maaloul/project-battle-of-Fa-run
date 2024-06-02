
class Castle {
    constructor(color) {
      this.color = color; 
      this.resources = 3; 
      this.warriors = []; 
    }
  
   
    accumulateResource() {
      this.resources++; 
      console.log(`Castle ${this.color} accumulated an additional resource. Total resources: ${this.resources}.`);
    }
  

setTeam(team) {
    let success = false; 
    team.forEach((warrior) => {
        let trainingCost = 1; 
        if (warrior.type === "Elfe") {
            trainingCost = 2;
        } else if (warrior.type === "Chef Nain") {
            trainingCost = 3;
        } else if (warrior.type === "Chef Elfe") {
            trainingCost = 4;
        }
        if (this.resources >= trainingCost) {
            console.log(`Training ${warrior.type} successful at Castle ${this.color}.`);
            this.resources -= trainingCost; 
            this.warriors.push(warrior); 
            success = true; 
        } else {
            console.log(`Not enough resources to train ${warrior.type} at Castle ${this.color}.`);
        }
    });
    console.log(`Castle ${this.color}: Remaining resources after training: ${this.resources}.`);
    return success; 
}
  }


  


function updateCastleCell(castle, warriorType) {
    const castleCell = document.querySelector(`.${castle.color}-castle-training`);
    let warriorImageSrc;

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

    
    const warriorImage = document.createElement("img");
    warriorImage.src = warriorImageSrc;
    warriorImage.alt = warriorType + ' ' + castle.color;
    warriorImage.classList.add("warrior-image");

   
    castleCell.appendChild(warriorImage);
    
}
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


    if (castle.setTeam([warrior])) {
        const castleCell = document.querySelector(`.${castle.color}-castle-training`);
        updateCastleCell(castle, warriorType);
        castleCell.lastChild.alt=castleCell.lastChild.alt+' '+warrior.id;
        console.log(castleCell)
        const coloredCastle = castle.color === 'blue' ? '<span style="color: blue;">Blue</span>' : '<span style="color: red;">Red</span>';
        const message = `Trained ${coloredCastle} ${warriorType} with ID ${warrior.id} successfully at Castle ${coloredCastle}, Remaining resources after training: ${castle.resources}.`;
        displayMessage(message);
    } else {
        displayMessage(`Not enough resources to train ${warriorType} at Castle ${castle.color}.`);
    }
}


function handleTrainingButtonClick(castle, player) {
    const selectElement = document.getElementById(`${player}-warrior`);
    const selectedWarrior = selectElement.value;
    trainWarrior(castle, selectedWarrior);
    if (castle.color=='red')
        document.getElementById("red-castle-points").textContent = ` - Remaining Points: ${castle.resources}`;
    else
        document.getElementById("blue-castle-points").textContent = ` - Remaining Points: ${castle.resources}`;
    

}

function moveWarriorsFromTrainingToCastle(castle) {
    const trainingGround = document.querySelector(`.${castle.color}-castle-training`);
    const castleCell = document.querySelector(`.${castle.color}-castle-cell`);

   
    if (!trainingGround || !castleCell) {
        console.error("Training ground or castle cell not found.");
        return 0
    }

  
    const warriorImages = trainingGround.querySelectorAll("img");
    warriorImages.forEach(warriorImage => {
        
        castleCell.appendChild(warriorImage);
        return 1
    });
}
    function adding_resseources(blueCastle,redCastle){
        blueCastle.accumulateResource();
        redCastle.accumulateResource();
        const bCastle = '<span style="color: blue;">Blue</span>'  ;
        const rcastle= '<span style="color: red;">Red</span>'
        displayMessage(`Castle ${bCastle} accumulated an additional resource. Total resources: ${blueCastle.resources}.`);
        displayMessage(`Castle ${rcastle} accumulated an additional resource. Total resources: ${redCastle.resources}.`);
        document.getElementById("blue-castle-points").textContent = ` - Remaining Points: ${blueCastle.resources}`;
        document.getElementById("red-castle-points").textContent = ` - Remaining Points: ${redCastle.resources}`;
      
    }
