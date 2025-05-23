import { useState } from "react";
import useHero from "../hooks/useHero";
import styles from "./GameScreen.module.css";
import CharacterInfo from "../components/CharacterInfo";
import DungeonMap from "../components/DungeonMap";
import OptionPrompts from "../components/OptionPrompts";
import BattleScreen from "../components/BattleScreen";
import BattleLog from "../components/BattleLog";
import styles from "./GameScreen.module.css";
// Images



const monster = {
  id: 1,
  name: "Goblin",
  image: "/monsters/MonsterGoblin.png",
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
      "name": "Crypt of the Forgotten King",
      "description": "A haunted crypt deep beneath the ruins of a forgotten castle. Whispers echo through the stone halls.",
      "id": "crypt-001",
      "rooms": [
    {
          "id": 1,
          "image": "/dungeons/crypt/Crypt-entrance.png",
          "name": "Sealed Entrance",
          "description": "The heavy stone door groans as it opens, revealing a tomb untouched for centuries.",
          "monsters": [
            {
              "id": 1,
              "name": "Crypt Guardian",
              "image": "/monsters/MonsterSkeleton.png",
              "level": 1,
              "health": 25,
              "maxHealth": 25,
              "attack": 3,
              "defense": 1,
              "loot": {
                "gold": 3,
                "items": ["Rusty Key"]
              },
              "experience": 8
            }
          ],
          "exits": [{ "direction": "north", "roomId": 2 }]
    },
    {
          "id": 2,
          "image": "/dungeons/crypt/Crypt-hallway.png",
          "name": "Hall of Whispers",
          "description": "Ghostly whispers fill the corridor. A faded inscription on the wall hints at a puzzle.",
          "monsters": [],
          "exits": [{ "direction": "east", "roomId": 3 }]
        },
        {
          "id": 3,
          "image": "/dungeons/crypt/Crypt-trickroom.png",
          "name": "Hall of Illusions",
          "description": "A trick room filled with mirrored illusions. One step in the wrong direction could be fatal.",
          "monsters": [
            {
              "id": 2,
              "name": "Phantom Shade",
              "image": "/monsters/MonsterShade.png",
              "level": 2,
              "health": 20,
              "maxHealth": 20,
              "attack": 4,
              "defense": 3,
              "loot": {
                "gold": 4,
                "items": ["Illusory Cloak Fragment"]
              },
              "experience": 12
            }
          ],
          "exits": [{ "direction": "north", "roomId": 4 }]
        },
        {
          "id": 4,
          "image": "/dungeons/crypt/Crypt-throneroom.jpeg",
          "name": "Throne of the Forgotten King",
          "description": "An ancient undead king rises from his throne, sword in hand. His gaze pierces your soul.",
          "monsters": [
            {
              "id": 3,
              "name": "Forgotten King",
              "image": "/monsters/MonsterUndeadKing.jpeg",
              "level": 4,
              "health": 60,
              "maxHealth": 60,
              "attack": 10,
              "defense": 5,
              "loot": {
                "gold": 15,
                "items": ["Cursed Crown", "Ancient Sword"]
              },
              "experience": 50
            }
          ],
          "exits": [{ "direction": "south", "roomId": 5 }]
        },
        {
          "id": 5,
          "image": "/dungeons/crypt/Crypt-secretvault.jpeg",
          "name": "Secret Vault",
          "description": "Behind the throne lies a hidden chamber filled with treasure and the King's forgotten journal.",
          "monsters": [],
          "exits": []
        }
      ]
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
        // TODO: Fetch a dungeon from the server
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
        updateHero(
          autoBattler(hero, currentRoom.monsters[0], addToBattleLog)
        );
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
              monster={currentRoom?.monsters[0]}
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
