import React from 'react';
import CharacterInfo from '../components/CharacterInfo';
import BattleScreen from '../components/BattleScreen';
import DungeonMap from '../components/DungeonMap';
import OptionPrompts from '../components/OptionPrompts';
import useGameState from '../hooks/useGameState';

const GameScreen = () => {
    const { character, monster, options } = useGameState();

    return (
        <div className="game-screen">
            <div className="top-left">
                <CharacterInfo character={character} />
            </div>
            <div className="top-right">
                <BattleScreen character={character} monster={monster} />
            </div>
            <div className="bottom-left">
                <DungeonMap />
            </div>
            <div className="bottom-right">
                <OptionPrompts options={options} />
            </div>
        </div>
    );
};

export default GameScreen;