const monsters = [
  {
    id: 1,
    name: "Goblin",
    level: 1,
    health: 30,
    attack: 5,
    defense: 2,
    experience: 10,
    loot: {
      gold: 5,
      items: ["Goblin Tooth", "Old Sword"]
    }
  },
  {
    id: 2,
    name: "Skeleton",
    level: 2,
    health: 40,
    attack: 7,
    defense: 3,
    experience: 15,
    loot: {
      gold: 10,
      items: ["Bone", "Rusty Shield"]
    }
  },
  {
    id: 3,
    name: "Orc",
    level: 3,
    health: 60,
    attack: 10,
    defense: 5,
    experience: 25,
    loot: {
      gold: 15,
      items: ["Orc Axe", "Orcish Armor"]
    }
  },
  {
    id: 4,
    name: "Troll",
    level: 4,
    health: 80,
    attack: 12,
    defense: 6,
    experience: 40,
    loot: {
      gold: 20,
      items: ["Troll Club", "Troll Skin"]
    }
  },
  {
    id: 5,
    name: "Dragon",
    level: 5,
    health: 150,
    attack: 20,
    defense: 10,
    experience: 100,
    loot: {
      gold: 50,
      items: ["Dragon Scale", "Dragon Claw"]
    }
  }
];

export default monsters;