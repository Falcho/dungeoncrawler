import { useState, useEffect } from "react";
import useHero from "../hooks/useHero";
import useDungeon from "../hooks/useDungeon";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import styles from "./GameScreen.module.css";


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

  const addLootToInventory = (loot) => {
    updateHero((prevHero) => ({
      ...prevHero,
      inventory: [...prevHero.inventory, loot],
    }));
  }

  const handleBattleResult = (updatedHero) => {
    updateHero(updatedHero);
  }

  useEffect(() => {
    if (gameState === "barracks") {
      fetchDungeon();
    }
  }, [gameState]);

  const handleAction = (action, nextRoomId) => {
    switch (gameState) {
      case "barracks":
        if (dungeon) {console.log(dungeon.name);}
        if (action === "ADVENTURE") {
          if (hero.health <= 1) {
            alert("You need to sleep!");
          } else {
            setCurrentRoom(dungeon.rooms[0]);
            setGameState("startAdventure");
          }
        }
        if (action === "SLEEP") {
          addToBattleLog("You are sleeping...");
          setGameState("sleeping");
        }
        break;

        case "startAdventure":
        setGameState("enterRoom");
        break;
        
        case "sleeping":
        //Set characterState to full health, and make the player wait for a few seconds
        updateHero({
          ...hero,
          health: hero.maxHealth,
        });
        addToBattleLog("You are fully healed!");
        setGameState("barracks");
        break;

      case "enterRoom":
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
        addToBattleLog("Resolving battle...");
        
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
          addLootToInventory(loot);
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
            {!loadingDungeon && (
              <BattleScreen
                dungeon={dungeon}
                currentRoom={currentRoom}
                gameState={gameState}
                character={hero}
                monster={currentRoom?.monsters[0]}
                loot={loot}
                handleBattleResult={handleBattleResult}
                addToBattleLog={addToBattleLog}
              />
            )}
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
                character={hero}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
