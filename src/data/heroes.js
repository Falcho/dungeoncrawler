import WarriorImg from '../assets/select-HeroWarrior.png'
import MageImg from '../assets/select-HeroMage.png';
import RogueImg from '../assets/select-HeroRogue.png';
import FighterSprite from "../assets/HeroWarrior.png";
import RogueSprite from "../assets/HeroRogue.png";
import WizardSprite from "../assets/HeroWizard.png";
import fullhp from "../assets/fullhp.png";
import halfhp from "../assets/halfhp.png";
import lowhp from "../assets/lowhp.png";
import fullhpRogue from "../assets/fullhpRogue.png";
import halfhpRogue from "../assets/halfhpRogue.png";
import lowhpRogue from "../assets/lowhpRogue.png";
import fullhpWizard from "../assets/fullhpWizard.png";
import halfhpWizard from "../assets/halfhpWizard.png";
import lowhpWizard from "../assets/lowhpWizard.png";

const heroes = [
  {
    id: 1,
    class: "Warrior",
    level: 1,
    gold: 0,
    image: WarriorImg,
    spriteImage: FighterSprite,
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: fullhp,
      half: halfhp,
      low: lowhp,
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
    spriteImage: WizardSprite,
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: fullhpWizard,
      half: halfhpWizard,
      low: lowhpWizard,
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
    spriteImage: RogueSprite,
    health: 30,
    maxHealth: 30,
    inventory: [],
    animations: {
      full: fullhpRogue,
      half: halfhpRogue,
      low: lowhpRogue,
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