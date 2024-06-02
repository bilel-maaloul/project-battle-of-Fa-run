
class Warrior {
  constructor(type, color) {
      this.id = Warrior.idCounters[color]++; 
      this.type = type; 
      this.color = color; 
      this.strength = 10; 
      this.hitPoints = 100; 
  }

  
  calculateDamage() {
      let damage = 0;
      for (let i = 0; i < this.strength; i++) {
          damage += Math.floor(Math.random() * 3) + 1; 
      }
      return damage;
  }


  receiveDamage(damage) {
      this.hitPoints -= damage; 
      if (this.hitPoints <= 0) {
          console.log(`${this.type} warrior with ID ${this.id} (${this.color}) has been defeated!`);
      }
  }

  
  isAlive() {
      return this.hitPoints > 0;
  }

  
  attack(target) {
      const damage = this.calculateDamage(); 
      target.receiveDamage(damage); 
  }
}


Warrior.idCounters = {
  "blue": 0,
  "red": 0
};

  
  class Nain extends Warrior {
    constructor() {
      super("Nain"); 
    }
  
    
    calculateDamage() {
      return super.calculateDamage() / 2; 
    }
  }
  
  class Elfe extends Warrior {
    constructor() {
      super("Elfe"); 
      this.strength *= 2; 
    }
  }
  
  class ChefNain extends Nain {
    constructor() {
      super(); 
      this.type = "Chef Nain"; 
    }
  }
  
  class ChefElfe extends Elfe {
    constructor() {
      super(); 
      this.type = "Chef Elfe"; 
    }
  }


