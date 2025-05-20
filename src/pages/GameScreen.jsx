import React from 'react';
import CharacterInfo from '../components/CharacterInfo';
import BattleScreen from '../components/BattleScreen';
import DungeonMap from '../components/DungeonMap';
import OptionPrompts from '../components/OptionPrompts';

const GameScreen = () => {
  const character = {
    name: 'Hero',
    class: 'Warrior',
    level: 5,
    gold: 100,
    image: '/assets/hero.png',
  };

  const monster = {
    name: 'Goblin',
    level: 3,
    image: '/assets/goblin.png',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', height: '100vh' }}>
      <CharacterInfo name={character.name} heroClass={character.class} level={character.level} gold={character.gold} />
      <BattleScreen character={character} monster={monster} />
      <DungeonMap />
      <OptionPrompts
        onFight={() => alert('Fight!')}
        onFlee={() => alert('Flee!')}
        onKickDoor={() => alert('Kick in the Door!')}
        onLookForTrouble={() => alert('Look for Trouble!')}
      />
    </div>
  );
};

export default GameScreen;