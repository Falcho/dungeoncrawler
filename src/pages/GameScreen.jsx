import { useState, useEffect } from "react";
import useHero from "../hooks/useHero";
import useDungeon from "../hooks/useDungeon";
import toggleGameState from "../utils/gameEngine";
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

  const [currentRoom, setCurrentRoom] = useState(null);

  const addToBattleLog = (message) => {
    setBattleLog((prevLog) => [...prevLog, message]);
  };

  const addLootToInventory = (loot) => {
    updateHero((prevHero) => ({
      ...prevHero,
      inventory: [...prevHero.inventory, loot],
    }));
  };

  const handleBattleResult = (updatedHero) => {
    updateHero(updatedHero);
  };

  const handleAction = (action, nextRoomId) => {
    toggleGameState({
      gameState,
      action,
      nextRoomId,
      hero,
      dungeon,
      currentRoom,
      setCurrentRoom,
      setGameState,
      setBattleLog,
      addToBattleLog,
      setLoot,
      updateHero,
      loot,
      addLootToInventory,
    });
  };

  useEffect(() => {
    if (gameState === "barracks") {
      fetchDungeon();
    }
  }, [gameState]);

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
