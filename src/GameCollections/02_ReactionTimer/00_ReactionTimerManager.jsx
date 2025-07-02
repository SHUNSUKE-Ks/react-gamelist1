import React from 'react';
import { GameState } from '../../constants/GameState';
import useGameFlow from '../../hooks/useGameFlow';
import Title from './01_Title';
import Tutorial from './02_Tutorial';
import MainGame from './03_MainGame';
import Result from './04_Result';
import './ReactionTimer.css';

const ReactionTimerManager = () => {
    const { gameState, gameData, navigateTo, resetGame } = useGameFlow({
        attempts: [],
        bestTime: null,
        averageTime: null,
    });

    switch (gameState) {
        case GameState.TITLE:
            return <Title onNext={() => navigateTo(GameState.TUTORIAL)} />;
        case GameState.TUTORIAL:
            return <Tutorial onNext={() => navigateTo(GameState.MAIN_GAME)} />;
        case GameState.MAIN_GAME:
            return <MainGame onNext={(resultData) => navigateTo(GameState.RESULT, resultData)} />;
        case GameState.RESULT:
            return <Result gameData={gameData} onNext={() => resetGame()} />;
        default:
            return <div>Unknown state</div>;
    }
};

export default ReactionTimerManager;
