import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroes from '../data/heroes';
import styles from './NewCharacter.module.css';

const NewCharacter = () => {
    const [selectedHero, setSelectedHero] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const navigate = useNavigate();

    const handleHeroSelect = (hero) => {
        setSelectedHero(hero);
    };

    const handleStartGame = () => {
        if (selectedHero && selectedClass) {
            // Logic to start the game with the selected hero and class
            // This could involve saving the hero and class to local storage or state management
            navigate('/game');
        } else {
            alert('Please select a hero and a class!');
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
                                <img src={hero.animation} alt={hero.name} />
                                <h2>{hero.name}</h2>
                                <p>Class: {hero.class}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>Choose Your Class</h2>
                    <div className={styles.options}>
                        <button
                            className={`${styles.option} ${selectedClass === 'Warrior' ? styles.selected : ''}`}
                            onClick={() => setSelectedClass('Warrior')}
                        >
                            Warrior
                        </button>
                        <button
                            className={`${styles.option} ${selectedClass === 'Mage' ? styles.selected : ''}`}
                            onClick={() => setSelectedClass('Mage')}
                        >
                            Mage
                        </button>
                        <button
                            className={`${styles.option} ${selectedClass === 'Rogue' ? styles.selected : ''}`}
                            onClick={() => setSelectedClass('Rogue')}
                        >
                            Rogue
                        </button>
                    </div>
                </div>
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