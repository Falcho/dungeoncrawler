import { useState } from 'react';
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import HeroImg from "../assets/HeroWarrior.png";
import GoblinImg from "../assets/MonsterGoblin.png";
import fullhp from "../assets/fullHP2.png";
import halfhp from "../assets/halfHP.png";
import lowhp from "../assets/lowHP.png";
import autoBattler from '../utils/autobattler';

const character = {
  id: 1,
  class: "Warrior",
  level: 1,
  gold: 0,
  health: 30,
  maxHealth: 30,
  inventory: ["Gold Sword", "Health Potion"],
  image: HeroImg,
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
};

const monster =   {
    id: 1,
    name: "Goblin",
    image: GoblinImg,
    level: 1,
    health: 30,
    maxHealth: 30,
    attack: 5,
    defense: 2,
    experience: 10,
    loot: {
      gold: 5,
      items: ["Goblin Tooth", "Old Sword"]
    }
  };
  
  const dungeon = {
  name: "Goblin Cave",
  description: "A dark and damp cave filled with goblins.",
  rooms: [
    {
      id: 1,
      name: "Entrance",
      description: "The entrance to the cave.",
      monsters: [monster],
      exits: [
        { direction: "north", roomId: 2 },
      ],
    },
    {
      id: 2,
      name: "Treasure Room",
      description: "A room filled with treasure.",
      monsters: [monster],
      exits: [],
    },
  ],
};

export default function GameScreen() {
  const [characterState, setCharacterState] = useState(character);
  const [gameState, setGameState] = useState("barracks");
  const [battleLog, setBattleLog] = useState([]);
  const [loot, setLoot] = useState([]);
  const [eventResolved, setEventResolved] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const addToBattleLog = (message) => {
    setBattleLog((prevLog) => [message, ...prevLog]);
  }
  const clearBattleLog = () => {
    setBattleLog([]);
  }

  const handleAction = (action, nextRoomId) => {
    switch (gameState) {
      case "barracks":
        if (action === "ADVENTURE") {
          // TODO: if hp<1 show alert that you need to sleep, else go to enterRoom
          setCurrentRoom(dungeon.rooms[0]);
          setGameState("enterRoom");
        }
        if (action === "SLEEP") {
          /* TODO: increase hp and wait for xx seconds, 
          maybe add an extra state for sleeping, 
          showing a sleeping animation and having the button to continue only appear after xx seconds
          */
        }
        break;

      case "enterRoom":
        // TODO: show some information about the room we are entering, a room description or something
        setGameState("encounter");
        break;

      case "encounter":
        if (action === "MONSTER") setGameState("battleChoice");
        if (action === "EVENT") setGameState("resolveEvent");
        break;

      case 'resolveEvent':
        setEventResolved(true);
        addToBattleLog('Event resolved!');
        setGameState('barracks');
        break;

      case 'battleChoice':
        if (action === 'FLEE') {
          addToBattleLog('You fled the battle!');
          setGameState('barracks');
        }
        if (action === 'USE_ITEM') {
          // implement item logic
        }
        if (action === "FIGHT") setGameState("autoBattle");
        break;

      case 'autoBattle':
        setBattleLog([...battleLog, 'Resolving battle...']);
        setCharacterState((prevState) => (autoBattler(prevState, monster, addToBattleLog)));
        setGameState('battleOutcome');
        break;

      case 'battleOutcome':
        if (characterState.health > 0) {
          addToBattleLog('You won the battle!');
          setGameState('loot');
        }
        else {
          addToBattleLog('You died!');
          setGameState('barracks');}
        break;

      case 'loot':
        setLoot('Gold Sword'); // maybe the autobattler should set the loot?
        // TODO: check if there is loot, otherwise just skip to next step
        addToBattleLog('You found loot:' + loot);
        // Add loot to character inventory
        // TODO: refactor to create an addLoot function
        setCharacterState((prevState) => ({
          ...prevState,
          inventory: [...prevState.inventory, loot], // or dynamic value
        }));
        setGameState("continueOrHome");
        break;

      case "continueOrHome":
        if (action === "CONTINUE") {
          let nextRoom = dungeon.rooms.find((room) => room.id === nextRoomId);
          if (nextRoom) {
            setCurrentRoom(nextRoom);
            setGameState("enterRoom");
          } else {
            // Handle case where nextRoomId is invalid
            setBattleLog([...battleLog, "No more rooms to explore!"]);
            setGameState("barracks");
          }
        }
        if (action === "GO_HOME") setGameState("barracks");
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.outer}>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.characterInfoBox}>
            <CharacterInfo hero={characterState} loot={loot} />
          </div>
          <div className={styles.dungeonMapBox}>
            <DungeonMap />
          </div>
        </div>
        <div className={styles.mainArea}>
          <div className={styles.battleArea}>
            <BattleScreen
              currentRoom={currentRoom}
              gameState={gameState}
              character={characterState}
              monster={monster}
            />
            <div className={styles.wrapper}>
              <div className={styles.battleLog}>
                <BattleLog battleLog={battleLog} />
              </div>
            </div>
            
          </div>

          <div className={styles.mainBottom}>
            <div className={styles.optionPrompts}>
              <OptionPrompts
                currentRoom={currentRoom}
                gameState={gameState}
                handleAction={handleAction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
