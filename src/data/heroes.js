const heroes = [
  {
    id: 1,
    class: "Warrior",
    level: 1,
    gold: 0,
    image: "/heroes/select-HeroWarrior.png",
    spriteImage: "/heroes/HeroWarrior.png",
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: "/heroes/fullhp.png",
      half: "/heroes/halfhp.png",
      low: "/heroes/lowhp.png",
    },
    equipment: {
      weapon: "Sword",
      armor: "Plate Armor",
    },
    attributes: {
      strength: 10,
      agility: 5,
      intelligence: 3,
    },
  },
  {
    id: 2,
    class: "Wizard",
    level: 1,
    gold: 0,
    image: "/heroes/select-HeroMage.png",
    spriteImage: "/heroes/HeroWizard.png",
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: "/heroes/fullhpWizard.png",
      half: "/heroes/halfhpWizard.png",
      low: "/heroes/lowhpWizard.png",
    },
    attributes: {
      strength: 3,
      agility: 4,
      intelligence: 10,
    },
    equipment: {
      weapon: "Staff",
      armor: "Silk Robe",
    },
  },
  {
    id: 3,
    class: "Rogue",
    level: 1,
    gold: 0,
    image: "/heroes/select-HeroRogue.png",
    spriteImage: "/heroes/HeroRogue.png",
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: "/heroes/fullhpRogue.png",
      half: "/heroes/halfhpRogue.png",
      low: "/heroes/lowhpRogue.png",
    },
    attributes: {
      strength: 5,
      agility: 10,
      intelligence: 4,
    },
    equipment: {
      weapon: "Dagger",
      armor: "Leather Armor",
    },
  },
];

export default heroes;