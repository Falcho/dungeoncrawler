import React from "react";
import styles from "./CharacterInfo.module.css";

const CharacterInfo = ({ hero, loot }) => {
  if (!hero) return null; // In case no hero is selected yet

  return (
    <div className={styles.charGrid}>
      <div className={styles.image}>
        <img src={hero.animations.full} alt={hero.class} />
      </div>
      <div className={styles.stats}>
        <strong>Class:</strong> {hero.class}
        <br />
        <strong>Level:</strong> {hero.level} <br />
        <strong>Health:</strong> {hero.health} / {hero.maxHealth} <br />
        <strong>Gold:</strong> {hero.gold}
        <hr />
        <strong>Attributes</strong>
        <br />
        STR: {hero.attributes.strength}
        <br />
        AGI: {hero.attributes.agility}
        <br />
        INT: {hero.attributes.intelligence}
        <hr />
        <strong>Equipment</strong>
        <br />
        Weapon: {hero.equipment?.weapon || "None"}
        <br />
        Armor: {hero.equipment?.armor || "None"}
      </div>
      <div className={styles.inventory}>
        <div className={styles.inventoryContent}>
          <strong>Inventory:</strong>
          <ul>
          {hero.inventory.length === 0 ? (
            <li>No items in inventory</li>
          ) : (
            hero.inventory.map((item, index) => <li key={index}>{item}</li>)
          )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
