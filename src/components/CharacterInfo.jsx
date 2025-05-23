import React from "react";
import styles from "./CharacterInfo.module.css";

const CharacterInfo = ({ character, loot }) => {
  if (!character) return null; // In case no hero is selected yet

  return (
    <div className={styles.charGrid}>
      <div className={styles.image}>
        <img src={character.animations.full} alt={character.class} />
      </div>
      <div className={styles.stats}>
        <strong>Name:</strong> {character.name}
        <br />
        <strong>Class:</strong> {character.class}
        <br />
        <strong>Level:</strong> {character.level} <br />
        <strong>Health:</strong> Health: {character.health} / {character.maxHealth ?? "??"}{" "} <br />
        <strong>Gold:</strong> {character.gold}
        <hr />
        <strong>Attributes</strong>
        <br />
        STR: {character.attributes.strength}
        <br />
        AGI: {character.attributes.agility}
        <br />
        INT: {character.attributes.intelligence}
        <hr />
        <strong>Equipment</strong>
        <br />
        Weapon: {character.equipment?.weapon || "None"}
        <br />
        Armor: {character.equipment?.armor || "None"}
      </div>
      <div className={styles.inventory}>
        <div className={styles.inventoryContent}>
          <strong>Inventory:</strong>
          <ul>
          {character.inventory.length === 0 ? (
            <li>No items in inventory</li>
          ) : (
            character.inventory.map((item, index) => <li key={index}>{item}</li>)
          )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
