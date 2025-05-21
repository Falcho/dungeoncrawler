import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroes from '../data/heroes';
import styles from './NewCharacter.module.css';

const NewCharacter = () => {
    const [selectedHero, setSelectedHero] = useState(null);
    const [characterName, setCharacterName] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setCharacterName(event.target.value);
    }
    const handleNameSubmit = (event) => {
        event.preventDefault();
        if (characterName.trim() === '') {
            alert('Please enter a character name!');
            return;
        }
    };

    const handleHeroSelect = (hero) => {
        setSelectedHero(hero);
    };

    const handleStartGame = () => {
        if (characterName.trim() === '') {
            alert('Please enter a character name!');
            return;
        }
        if (selectedHero) {
            // Logic to start the game with the selected hero 
            // This could involve saving the hero to local storage or state management
            navigate('/game');
        } else {
            alert('Please select a hero!');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Character</h1>
            <div className={styles.selection}>
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>Choose Your Hero</h2>
                    <div className={styles.options}>
                        {heroes.map((hero) => (
                            <div
                                key={hero.id}
                                className={`${styles.option} ${selectedHero === hero ? styles.selected : ''}`}
                                onClick={() => handleHeroSelect(hero)}
                            >
                                <input
                                    type='radio'
                                    name='hero'
                                    value={hero.id}
                                    checked={selectedHero?.id === hero.id}
                                    onChange={() => handleHeroSelect(hero)}
                                    className={styles.radioInput}
                                />
                                <img src={hero.image} alt={hero.name} />
                                <h2>{hero.name}</h2>
                                <p>Class: {hero.class}</p>
                            </div>
                        ))}
                    </div>
                </div>      
            </div>
            <div className={styles.nameInput}>
                <h2 className={styles.subtitle}>Enter Character Name </h2>
                <form onSubmit={handleNameSubmit}>
                    <input
                        type='text'
                        value={characterName}
                        onChange={handleNameChange}
                        placeholder='Enter your character name'
                        className={styles.input}
                    />
                </form>
            </div>
            
            <div className={styles.buttons}>
                <button className={styles.backButton} onClick={() => navigate('/')}>
                    Back
                </button>
                <button className={styles.startButton} onClick={handleStartGame}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default NewCharacter;