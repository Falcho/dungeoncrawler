// src/pages/GameScreen.jsx
import { useState } from "react";
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import HeroImg from "../assets/HeroWarrior.png";
import MonsterImg from "../assets/MonsterGoblin.png";

const character = {
  name: "Sir Choppins",
  heroClass: "Warrior",
  level: 5,
  gold: 100,
  image: HeroImg,
  health: 30,
  maxHealth: 30,
  inventory: [],
};

const monster = {
  name: "Goblin",
  level: 3,
  image: MonsterImg,
  health: 20,
  maxHealth: 20,
};

export default function GameScreen() {
  const [characterState, setCharacterState] = useState(character);
  const [gameState, setGameState] = useState('barracks');
  const [battleLog, setBattleLog] = useState([]);
  const [loot, setLoot] = useState([]);
  const [eventReolved, setEventResolved] = useState(false);

  const handleAction = (action) => {
    switch (gameState) {
      case 'barracks':
        if (action === 'ADVENTURE') setGameState('enterRoom');
        if (action === 'SLEEP') {
          // implement sleep logic if needed
        }
        break;

      case 'enterRoom':
        setGameState('encounter');
        break;

      case 'encounter':
        if (action === 'MONSTER') setGameState('battleChoice');
        if (action === 'EVENT') setGameState('resolveEvent');
        break;

      case 'resolveEvent':
        setEventResolved(true);
        setBattleLog([...battleLog, 'Event resolved!']);
        setGameState('barracks');
        break;

      case 'battleChoice':
        if (action === 'FLEE') {
          setBattleLog([...battleLog, 'You fled the battle!']);}
          setGameState('barracks');
        if (action === 'USE_ITEM') {
          // implement item logic
        }
        if (action === 'FIGHT') setGameState('autoBattle');
        break;

      case 'autoBattle':
        setBattleLog([...battleLog, 'Resolving battle...']);
        setGameState('battleOutcome');
        break;

      case 'battleOutcome':
        if (action === 'SUCCESS') {
          setBattleLog([...battleLog, 'You won the battle!']);
          setGameState('loot');
        }
        if (action === 'FAIL') {
          setBattleLog([...battleLog, 'You died!']);
          setGameState('barracks');}
        break;

      case 'loot':
        setLoot('Gold Sword'); // or dynamic value
        setBattleLog([...battleLog, 'You found loot:' + loot]);
        // Add loot to character inventory
        setCharacterState((prevState) => ({
          ...prevState,
          inventory: [...prevState.inventory, loot] // or dynamic value
        }));
        setGameState('continueOrHome');
        break;

      case 'continueOrHome':
        if (action === 'CONTINUE') setGameState('enterRoom');
        if (action === 'GO_HOME') setGameState('barracks');
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.screen}>
      <div className={styles.background}></div>
      <div className={styles.grid}>
        <div className={styles.characterInfoBox}>
          <CharacterInfo {...characterState} />
        </div>
        <div className={styles.dungeonMapBox}>
          <DungeonMap />
        </div>
        <div className={styles.b3}>
          <OptionPrompts
            gameState={gameState}
            handleAction={handleAction}
          />
        </div>

        <div className={styles.battleLog}>
          <BattleLog battleLog={battleLog} />
        </div>

        {/* BattleScreen sits in the open area using grid lines */}
        <div className={styles.battleArea}>
          <BattleScreen gameState={gameState} character={character} monster={monster} />
        </div>
      </div>
    </div>
  );
}
