import React, { useState } from 'react';
import { GameState } from '../../constants/GameState';
import Title from './01_Title';
import Tutorial from './02_Tutorial';
import MainGame from './03_MainGame';
import Result from './04_Result';
import './ReactionTimer.css';

const ReactionTimerManager = () => {
    const [gameState, setGameState] = useState(GameState.TITLE);
    const [gameData, setGameData] = useState({
        attempts: [],
        bestTime: null,
        averageTime: null,
    });

    const onNext = (nextState, data = {}) => {
        setGameState(nextState);
        if (data) {
            setGameData(prevData => ({ ...prevData, ...data }));
        }
    };

    switch (gameState) {
        case GameState.TITLE:
            return <Title onNext={() => onNext(GameState.TUTORIAL)} />;
        case GameState.TUTORIAL:
            return <Tutorial onNext={() => onNext(GameState.MAIN_GAME)} />;
        case GameState.MAIN_GAME:
            return <MainGame onNext={(resultData) => onNext(GameState.RESULT, resultData)} />;
        case GameState.RESULT:
            return <Result gameData={gameData} onNext={() => onNext(GameState.TITLE)} />;
        default:
            return <div>Unknown state</div>;
    }
};

export default ReactionTimerManager;
