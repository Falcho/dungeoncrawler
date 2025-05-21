export default function autoBattler(hero, monster, logger) {
    const mainStatMap = {
        Warrior: 'strength',
        Mage: 'intelligence',
        Rogue: 'agility'
    };

    const heroStat = mainStatMap[hero.class];
    if (!heroStat) throw new Error('Unknown hero class');

    let heroState = { ...hero };
    let monsterState = { ...monster };

    while (heroState.health > 0 && monsterState.health > 0) {
        monsterState.health -= heroState[heroStat];
        logger(`${hero.class} deals ${hero.attributes.strength} damage to ${monster.name}.`); //${hero.class} should be changed to ${hero.name}

        if (monsterState.health <= 0) break;

        heroState.health -= monsterState.attack;
        logger(`${monster.name} deals ${monster.attack} damage to ${hero.class}.`); //${hero.class} should be changed to ${hero.name}
    }

    return heroState;
}

// Example usage:
/*
const hero = { class: 'Warrior', health: 30, strength: 8, intelligence: 2, agility: 3 };
const monster = { health: 25, attack: 5 };
console.log(autoBattler(hero, monster));
*/

// TODO
//Add logger, in while loop
//in gameScreen, setBattleLog in autobattler,