import persistence from "../utils/persistence";
import { useState, useEffect } from "react";

const useDungeon = () => {
  const [dungeon, setDungeon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDungeon = () => {
    setLoading(true);
    persistence
      .fetchData("dungeons")
      .then((data) => {
        let dungeonIndex = Math.floor(data.length * Math.random());
        setDungeon(data[dungeonIndex]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Api Error", error);
        if (error.status === 401) {
          persistence.logout();
        }
        setDungeon({
          name: "Training Dungeon",
          description:
            "This is a training dungeon, to help you improve while we fix the server",
          rooms: [
            {
              id: 1,
              image: "/dungeons/goblin-cave/Goblin-cave-entrance.png",
              name: "Entrance",
              description: "the entrance to the cave.",
              monsters: [
                {
                  id: 1,
                  name: "Goblin",
                  image: "/monsters/MonsterGoblin.png",
                  level: 1,
                  health: 30,
                  maxHealth: 30,
                  attack: 2,
                  defense: 2,
                  loot: {
                    gold: 5,
                    items: ["Goblin Tooth"],
                  },
                  experience: 10,
                },
              ],
              exits: [{ direction: "north", roomId: 2 }],
            },
            {
              id: 2,
              image: "/dungeons/goblin-cave/Goblin-cave-forked.png",
              name: "Hallway",
              description: "a long and dark hallway.",
              monsters: [
                {
                  id: 1,
                  name: "Goblin",
                  image: "/monsters/MonsterGoblin.png",
                  level: 2,
                  health: 30,
                  maxHealth: 30,
                  attack: 5,
                  defense: 2,
                  experience: 10,
                  loot: {
                    gold: 5,
                    items: ["Old Sword"],
                  },
                },
              ],
              exits: [{ direction: "east", roomId: 3 }],
            },
            {
              id: 3,
              image: "/dungeons/goblin-cave/Goblin-cave-treasureRoom.png",
              name: "Treasure Room",
              description: "a room filled with treasure.",
              monsters: [
                {
                  id: 2,
                  name: "Goblin Chief",
                  image: "/monsters/MonsterGoblin.png",
                  level: 2,
                  health: 20,
                  maxHealth: 40,
                  attack: 7,
                  defense: 2,
                  experience: 10,
                  loot: {
                    gold: 5,
                    items: ["Gold Sword"],
                  },
                },
              ],
              exits: [],
            },
          ],
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDungeon();
  }, []);

  return { dungeon, loading, fetchDungeon };
};
export default useDungeon;
