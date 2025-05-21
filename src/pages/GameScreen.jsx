// src/pages/GameScreen.jsx
import React from "react";
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
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
};

const monster = {
  name: "Goblin",
  level: 3,
  image: MonsterImg,
  health: 20,
  maxHealth: 20,
};

export default function GameScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.background}></div>
      <div className={styles.grid}>
        <div className={styles.b1}>
          <CharacterInfo {...character} />
        </div>
        <div className={styles.b2}>
          <DungeonMap />
        </div>
        <div className={styles.b3}>
          <OptionPrompts
            onFight={() => {}}
            onFlee={() => {}}
            onLoot={() => {}} // new
            onUseItem={() => {}} // new
            onLootRoom={() => {}} // new
            onMoveOn={() => {}} // new
            canLoot={true} // or false if loot is not possible
          />
        </div>

        <div className={styles.b4}>
          Sir Choppins hit Goblin for 6hp
          <br />
          Goblin hit Sir Choppins for 2hp
        </div>

        {/* BattleScreen sits in the open area using grid lines */}
        <div className={styles.battleArea}>
          <BattleScreen character={character} monster={monster} />
        </div>
      </div>
    </div>
  );
}
