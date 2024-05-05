// Define a class for warriors
class Warrior {
  constructor(type, color) {
      this.id = Warrior.idCounters[color]++; // Assign unique ID to each warrior for each color
      this.type = type; // Type of warrior (e.g., "elf", "dwarf", etc.)
      this.color = color; // Color of the warrior (e.g., "blue", "red")
      this.strength = 10; // Base strength of the warrior
      this.hitPoints = 100; // Base hit points of the warrior
  }

  // Method to calculate damage inflicted by the warrior
  calculateDamage() {
      let damage = 0;
      for (let i = 0; i < this.strength; i++) {
          damage += Math.floor(Math.random() * 3) + 1; // Random damage between 1 and 3
      }
      return damage;
  }

  // Method to receive damage
  receiveDamage(damage) {
      this.hitPoints -= damage; // Reduce hit points by damage amount
      if (this.hitPoints <= 0) {
          console.log(`${this.type} warrior with ID ${this.id} (${this.color}) has been defeated!`);
      }
  }

  // Method to check if the warrior is alive
  isAlive() {
      return this.hitPoints > 0;
  }

  // Method for warrior to attack another warrior
  attack(target) {
      const damage = this.calculateDamage(); // Calculate damage
      target.receiveDamage(damage); // Inflict damage on the target
  }
}

// Initialize static ID counters for each castle color
Warrior.idCounters = {
  "blue": 1,
  "red": 1
};

  // Define subclasses for different types of warriors
  class Nain extends Warrior {
    constructor() {
      super("Nain"); // Type of warrior is "Nain"
    }
  
    // Override calculateDamage method for Nain
    calculateDamage() {
      return super.calculateDamage() / 2; // Nain takes half the damage
    }
  }
  
  class Elfe extends Warrior {
    constructor() {
      super("Elfe"); // Type of warrior is "Elfe"
      this.strength *= 2; // Elfe has double the base strength
    }
  }
  
  class ChefNain extends Nain {
    constructor() {
      super(); // Call parent constructor
      this.type = "Chef Nain"; // Update type to "Chef Nain"
    }
  }
  
  class ChefElfe extends Elfe {
    constructor() {
      super(); // Call parent constructor
      this.type = "Chef Elfe"; // Update type to "Chef Elfe"
    }
  }

// Define a class for castles
class Castle {
    constructor(color) {
      this.color = color; // Color of the castle (e.g., "blue", "red", etc.)
      this.resources = 3; // Initial resources of the castle
      this.warriors = []; // Warriors trained by the castle
    }
  
    // Method to accumulate additional resource at the beginning of each turn
    accumulateResource() {
      this.resources++; // Increment resources by 1
      console.log(`Castle ${this.color} accumulated an additional resource. Total resources: ${this.resources}.`);
    }
  
    // Method to set the team and train the warriors
 //  the setTeam method return a boolean indicating success
setTeam(team) {
    let success = false; // Initialize success flag
    team.forEach((warrior) => {
        let trainingCost = 1; // Base training cost
        if (warrior.type === "Elfe") {
            trainingCost = 2;
        } else if (warrior.type === "Chef Nain") {
            trainingCost = 3;
        } else if (warrior.type === "Chef Elfe") {
            trainingCost = 4;
        }
        if (this.resources >= trainingCost) {
            console.log(`Training ${warrior.type} successful at Castle ${this.color}.`);
            this.resources -= trainingCost; // Deduct training cost from resources
            this.warriors.push(warrior); // Add trained warrior to the castle's team
            success = true; // Set success flag to true
        } else {
            console.log(`Not enough resources to train ${warrior.type} at Castle ${this.color}.`);
        }
    });
    console.log(`Castle ${this.color}: Remaining resources after training: ${this.resources}.`);
    return success; // Return success flag
}
  }

