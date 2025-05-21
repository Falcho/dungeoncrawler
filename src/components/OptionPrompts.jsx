import React from 'react';
import styles from './OptionPrompts.module.css';

const OptionPrompts = ({
  onFight,
  onFlee,
  onLoot,      // new
  onUseItem,   // new
  onLootRoom,  // new
  onMoveOn,    // new
  canLoot,     // new (controls if Loot should show)
}) => (
  <div className={styles.promptsContainer}>
    <button className={styles.button} onClick={onFight}>Fight</button>
    <button className={styles.button} onClick={onFlee}>Flee</button>
    {canLoot && (
      <button className={styles.button} onClick={onLoot}>Loot</button>
    )}
    <button className={styles.button} onClick={onUseItem}>Use Item</button>
    <button className={styles.button} onClick={onLootRoom}>Loot the room</button>
    <button className={styles.button} onClick={onMoveOn}>Move on</button>
  </div>
);

export default OptionPrompts;
