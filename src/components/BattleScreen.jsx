import React from 'react';

const BattleScreen = ({ character, monster }) => {
    return (
        <div className="battle-screen">
            <div className="character">
                <h2>{character.name}</h2>
                <p>Class: {character.class}</p>
                <p>Level: {character.level}</p>
                <p>Gold: {character.gold}</p>
            </div>
            <div className="monster">
                <h2>Monster: {monster.name}</h2>
                <p>Level: {monster.level}</p>
            </div>
        </div>
    );
};

export default BattleScreen;