import { useState } from "react";
import useHero from "../hooks/useHero";
import useDungeon from "../hooks/useDungeon";
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import autoBattler from "../utils/autobattler";

// Images

export default function GameScreen() {
  const { hero, updateHero } = useHero();
  const { dungeon, loading: loadingDungeon, fetchDungeon } = useDungeon();
  const [gameState, setGameState] = useState("barracks");
  const [battleLog, setBattleLog] = useState([]);
  const [loot, setLoot] = useState([]);
  const [eventResolved, setEventResolved] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const addToBattleLog = (message) => {
    setBattleLog((prevLog) => [...prevLog, message]);
  };
  const clearBattleLog = () => {
    setBattleLog([]);
  };

  const handleAction = (action, nextRoomId) => {
    switch (gameState) {
      case "barracks":
        // TODO: Fetch a dungeon from the server
        fetchDungeon();
        console.log(dungeon.name);
        // TODO: add a loading screen while fetching the dungeon (prevents the user from clicking buttons while loading)
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
        }
        break;
      //Set characterState to full health, and make the player wait for a few seconds

      case "sleeping":
        hero.health = hero.maxHealth;
        addToBattleLog("You are fully healed!");
        setGameState("barracks");
        break;

      case "enterRoom":
        addToBattleLog(
          "You entered a room, it looks like " + currentRoom.description
        );
        setGameState("encounter");
        if (currentRoom.monsters.length) setGameState("battleChoice");
        if (currentRoom.event) setGameState("resolveEvent");
        break;

      case "encounter":
        setGameState("resolveEvent");
        break;
      case "resolveEvent":
        setEventResolved(true);
        addToBattleLog("Event resolved!");
        setGameState("loot");
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
        updateHero(autoBattler(hero, currentRoom.monsters[0], addToBattleLog));
        setGameState("battleOutcome");
        break;

      case "battleOutcome":
        if (hero.health > 0) {
          addToBattleLog("You won the battle!");
          setLoot(currentRoom.monsters[0].loot.items[0]);
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
            <CharacterInfo character={hero} loot={loot} />
          </div>
          <div className={styles.dungeonMapBox}>
            <DungeonMap />
          </div>
        </div>
        <div className={styles.mainArea}>
          <div className={styles.battleArea}>
            {(!loadingDungeon) && (
            <BattleScreen
              currentRoom={currentRoom}
              gameState={gameState}
              character={hero}
              monster={currentRoom?.monsters[0]}
            />)}
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
