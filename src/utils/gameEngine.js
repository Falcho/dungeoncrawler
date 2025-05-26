export default function handleGameState({
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
  addLootToInventory
}) {
  switch (gameState) {
    case "barracks":
      if (dungeon) { console.log(dungeon.name); }
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
          setBattleLog((prev) => [...prev, "No more rooms to explore!"]);
          setGameState("barracks");
        }
      }
      if (action === "GO_HOME") setGameState("barracks");
      break;

    default:
      break;
  }
}