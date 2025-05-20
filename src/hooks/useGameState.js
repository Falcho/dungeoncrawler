import { useState, useEffect } from 'react';

const useGameState = () => {
    const [gameState, setGameState] = useState(() => {
        const savedState = localStorage.getItem('gameState');
        return savedState ? JSON.parse(savedState) : initialState();
    });

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    const initialState = () => ({
        character: null,
        level: 1,
        gold: 0,
        dungeonMap: [],
        currentMonster: null,
        // Add other initial state properties as needed
    });

    const saveGame = (newState) => {
        setGameState(newState);
    };

    const loadGame = () => {
        const savedState = localStorage.getItem('gameState');
        return savedState ? JSON.parse(savedState) : null;
    };

    return {
        gameState,
        saveGame,
        loadGame,
    };
};

export default useGameState;