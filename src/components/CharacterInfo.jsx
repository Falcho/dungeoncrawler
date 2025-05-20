import React from 'react';
import styles from './CharacterInfo.module.css';

const CharacterInfo = ({ character }) => {
    return (
        <div className={styles.characterInfo}>
            <h2>Character Info</h2>
            <p><strong>Name:</strong> {character.name}</p>
            <p><strong>Class:</strong> {character.class}</p>
            <p><strong>Level:</strong> {character.level}</p>
            <p><strong>Gold:</strong> {character.gold}</p>
        </div>
    );
};

export default CharacterInfo;