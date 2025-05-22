import { useState } from "react";
import useHero from "../hooks/useHero";
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import HeroImg from "../assets/HeroWarrior.png";
import GoblinImg from "../assets/MonsterGoblin.png";
import autoBattler from "../utils/autobattler";
import caveEntrace from "../assets/goblin-cave/Goblin-cave-entrance.png";
import treasureRoom from "../assets/goblin-cave/Goblin-cave-treasureRoom.png";


const monster = {
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
    items: ["Goblin Tooth", "Old Sword"],
  },
};

const dungeon = {
  name: "Goblin Cave",
  description: "A dark and damp cave filled with goblins.",
  rooms: [
    {
      id: 1,
      image: caveEntrace,
      name: "Entrance",
      description: "the entrance to the cave.",
      monsters: [monster],
      exits: [{ direction: "north", roomId: 2 }],
    },
    {
      id: 2,
      image: treasureRoom,
      name: "Treasure Room",
      description: "a room filled with treasure.",
      monsters: [monster],
      exits: [],
    },
  ],
};

export default function GameScreen() {
  const { hero, updateHero } = useHero();
  const [gameState, setGameState] = useState("barracks");
  const [battleLog, setBattleLog] = useState([]);
  const [loot, setLoot] = useState([]);
  const [eventResolved, setEventResolved] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const addToBattleLog = (message) => {
    setBattleLog((prevLog) => [message, ...prevLog]);
  };
  const clearBattleLog = () => {
    setBattleLog([]);
  };

  const handleAction = (action, nextRoomId) => {
    switch (gameState) {
      case "barracks":
        if (action === "ADVENTURE") {
          if (hero.health <= 1) {
            alert("You need to sleep!");
          } else {
            // TODO: if hp<1 show alert that you need to sleep, else go to enterRoom
            setCurrentRoom(dungeon.rooms[0]);
            setGameState("enterRoom");
          }
        }
        if (action === "SLEEP") {
          addToBattleLog("You are sleeping...");
          setGameState("sleeping");
          /* TODO: increase hp and wait for xx seconds, 
          maybe add an extra state for sleeping, 
          showing a sleeping animation and having the button to continue only appear after xx seconds
          */
        }
        break;
      //Set characterState to full health, and make the player wait for a few seconds

      case "sleeping":
        hero.health = hero.maxHealth;
        addToBattleLog("You are fully healed!");
        setGameState("barracks");
        break;

      case "enterRoom":
        // TODO: show some information about the room we are entering, a room description or something
        addToBattleLog(
          "You entered a room, it looks like " + currentRoom.description
        );
        setGameState("encounter");
        break;

      case "encounter":
        if (action === "MONSTER") setGameState("battleChoice");
        if (action === "EVENT") setGameState("resolveEvent");
        break;

      case "resolveEvent":
        setEventResolved(true);
        addToBattleLog("Event resolved!");
        setGameState("barracks");
        break;

      case "battleChoice":
        if (action === "FLEE") {
          addToBattleLog("You fled the battle!");
          setGameState("barracks");
        }
        if (action === "USE_ITEM") {
          // implement item logic
        }
        if (action === "FIGHT") setGameState("autoBattle");
        break;

      case "autoBattle":
        setBattleLog([...battleLog, "Resolving battle..."]);
        updateHero(
          autoBattler(hero, monster, addToBattleLog)
        );
        setGameState("battleOutcome");
        break;

      case "battleOutcome":
        if (hero.health > 0) {
          addToBattleLog("You won the battle!");
          setLoot("Gold Sword");
          setGameState("loot");
        } else {
          addToBattleLog("You died!");
          setGameState("barracks");
        }
        break;

      case "loot":
        // maybe the autobattler should set the loot?
        // TODO: check if there is loot, otherwise just skip to next step
        if (loot) {
          addToBattleLog("You found loot:" + loot);
          // Add loot to character inventory
          // TODO: refactor to create an addLoot function
          updateHero({
            ...hero,
            inventory: [...hero.inventory, loot], // or dynamic value
          });
          setLoot(null);
        }
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
            <CharacterInfo hero={hero} loot={loot} />
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
              character={hero}
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
