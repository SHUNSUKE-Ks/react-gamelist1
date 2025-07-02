import { useState, useCallback } from 'react';
import { GameState } from '../constants/GameState';

const useGameFlow = (initialGameData = {}) => {
    const [gameState, setGameState] = useState(GameState.TITLE);
    const [gameData, setGameData] = useState(initialGameData);

    const navigateTo = useCallback((nextState, data = {}) => {
        setGameState(nextState);
        if (Object.keys(data).length > 0) {
            setGameData(prevData => ({ ...prevData, ...data }));
        }
    }, []);

    const resetGame = useCallback(() => {
        setGameState(GameState.TITLE);
        setGameData(initialGameData);
    }, [initialGameData]);

    return { gameState, gameData, navigateTo, resetGame, setGameData };
};

export default useGameFlow;
