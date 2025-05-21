import React from "react";
import styles from "./OptionPrompts.module.css";

const OptionPrompts = ({ gameState, handleAction }) => (
  <div className={styles.promptsContainer}>
    {gameState === "barracks" && (
      <>
        <button
          className={styles.button}
          onClick={() => handleAction("ADVENTURE")}
        >
          Adventure
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("SLEEP")}
        >
          Sleep
        </button>
      </>
    )}
    {gameState === "enterRoom" && (
      <button
        className={styles.button}
        onClick={() => handleAction()}
      >
        Enter Room
      </button>
    )}

    {gameState === "encounter" && (
      <>
        <button
          className={styles.button}
          onClick={() => handleAction("MONSTER")}
        >
          Monster
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("EVENT")}
        >
          Event
        </button>
      </>
    )}

    {gameState === "resolveEvent" && (
      <button
        className={styles.button}
        onClick={() => handleAction("RESOLVE")}
      >
        Resolve
      </button>
    )}

    {gameState === "battleChoice" && (
      <>
        <button
          className={styles.button}
          onClick={() => handleAction("FLEE")}
        >
          Flee
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("USE_ITEM")}
        >
          Use Item
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("FIGHT")}
        >
          Fight
        </button>
      </>
    )}

    {gameState === "autoBattle" && (
      <button
        className={styles.button}
        onClick={() => handleAction()}
      >
        Auto Battle
      </button>
    )}

    {gameState === "battleOutcome" && (
      <>
        <button
          className={styles.button}
          onClick={() => handleAction("SUCCESS")}
        >
          Success
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("FAIL")}
        >
          Fail
        </button>
      </>
    )}

    {gameState === "loot" && (
      <button
        className={styles.button}
        onClick={() => handleAction()}
      >
        Get Loot
      </button>
    )}

    {gameState === "continueOrHome" && (
      <>
        <button
          className={styles.button}
          onClick={() => handleAction("CONTINUE")}
        >
          Continue
        </button>
        <button
          className={styles.button}
          onClick={() => handleAction("GO_HOME")}
        >
          Go Home
        </button>
      </>
    )}
  </div>
);

export default OptionPrompts;
