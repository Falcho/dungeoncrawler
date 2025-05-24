export default function autoBattler(hero, monster, logger, onDamage) { // TODO: add callback damageEvent parameter
    let heroAttack;

    // Use a switch block to determine the hero's attack stat
    switch (hero.class) {
        case 'Warrior':
            heroAttack = hero.attributes.strength;
            break;

        case 'Wizard':
            heroAttack = hero.attributes.intelligence;
            break;

        case 'Rogue':
            heroAttack = hero.attributes.agility;
            break;

        default:
            heroAttack = 0; // Fallback in case of an unknown class
            logger(`Unknown hero class: ${hero.class}`);
    }

    // Battle loop
    while (hero.health > 0 && monster.health > 0) {
        // Hero attacks monster
        monster.health -= heroAttack;
        logger(`${hero.name} deals ${heroAttack} damage to ${monster.name}.`);
        // TODO: use a callback to send damage events up to the UI
        if (onDamage) onDamage({ target: "monster", amount: heroAttack });


        if (monster.health <= 0) break;

        // Monster attacks hero
        hero.health -= monster.attack;
        logger(`${monster.name} deals ${monster.attack} damage to ${hero.name}.`);
        // TODO: use a callback to send damage events up to the UI
        if (onDamage) onDamage({ target: "hero", amount: monster.attack });

        setTimeout(() => {
            // Simulate a delay for the next attack
            logger(`Next attack in 0,5 seconds...`);
        }, 500);
    }

    return hero;
}

