import WarriorImg from '../assets/select-HeroWarrior.png'
import MageImg from '../assets/select-HeroMage.png';
import RogueImg from '../assets/select-HeroRogue.png';

const heroes = [
  {
    id: 1,
    name: "Warrior",
    class: "Fighter",
    level: 1,
    gold: 0,
    image: WarriorImg,
    animations: {
      idle: "animations/warrior_idle.png",
      attack: "animations/warrior_attack.png",
      run: "animations/warrior_run.png",
    },
    attributes: {
      strength: 10,
      agility: 5,
      intelligence: 3,
    },
  },
  {
    id: 2,
    name: "Mage",
    class: "Spellcaster",
    level: 1,
    gold: 0,
    image: MageImg,
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
  },
  {
    id: 3,
    name: "Rogue",
    class: "Stealth",
    level: 1,
    gold: 0,
    image: RogueImg,
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
  },
];

export default heroes;