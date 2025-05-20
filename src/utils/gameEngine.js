const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const calculateDamage = (attacker, defender) => {
    const baseDamage = getRandomInt(1, attacker.attack);
    const damageReduction = getRandomInt(0, defender.defense);
    return Math.max(0, baseDamage - damageReduction);
};

const battle = (player, monster) => {
    const playerDamage = calculateDamage(player, monster);
    const monsterDamage = calculateDamage(monster, player);

    player.health -= monsterDamage;
    monster.health -= playerDamage;

    return {
        playerHealth: player.health,
        monsterHealth: monster.health,
        playerDamage,
        monsterDamage,
    };
};

const levelUp = (character) => {
    character.level += 1;
    character.attack += 2; // Increase attack power
    character.defense += 1; // Increase defense
    character.health += 5; // Increase health
};

const saveGame = (gameState) => {
    localStorage.setItem('adventureGame', JSON.stringify(gameState));
};

const loadGame = () => {
    const savedGame = localStorage.getItem('adventureGame');
    return savedGame ? JSON.parse(savedGame) : null;
};

export { battle, levelUp, saveGame, loadGame };