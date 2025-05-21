import WarriorImg from '../assets/select-HeroWarrior.png'
import MageImg from '../assets/select-HeroMage.png';
import RogueImg from '../assets/select-HeroRogue.png';

const heroes = [
  {
    id: 1,
    class: "Warrior",
    level: 1,
    gold: 0,
    image: WarriorImg,
    health: 30,
    maxHealth: 30,
    animations: {
      idle: "animations/warrior_idle.png",
      attack: "animations/warrior_attack.png",
      run: "animations/warrior_run.png",
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
    image: MageImg,
    health: 30,
    maxHealth: 30,
    animations: {
      idle: "animations/mage_idle.png",
      attack: "animations/mage_attack.png",
      run: "animations/mage_run.png",
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
    image: RogueImg,
    health: 30,
    maxHealth: 30,
    animations: {
      idle: "animations/rogue_idle.png",
      attack: "animations/rogue_attack.png",
      run: "animations/rogue_run.png",
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