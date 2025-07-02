import React from 'react';
import Title from './01_Title';
import Tutorial from './02_Tutorial';
import MainGame from './03_MainGame';
import Result from './04_Result';
import { GameState } from '../../constants/GameState';
import useGameFlow from '../../hooks/useGameFlow';

const HighLowManager = () => {
  const { gameState, gameData, navigateTo, resetGame } = useGameFlow({
    score: 0,
    round: 1,
    consecutiveWins: 0,
    gameHistory: [],
    maxConsecutiveWins: 0,
  });

  const handleGameStart = () => {
    navigateTo(GameState.TUTORIAL);
  };

  const handleTutorialEnd = () => {
    navigateTo(GameState.MAIN_GAME);
  };

  const handleGameEnd = (finalScore, history, maxWins) => {
    navigateTo(GameState.RESULT, { score: finalScore, gameHistory: history, maxConsecutiveWins: maxWins });
  };

  const handleRestart = () => {
    navigateTo(GameState.MAIN_GAME, {
      score: 0,
      round: 1,
      consecutiveWins: 0,
      gameHistory: [],
      maxConsecutiveWins: 0,
    });
  };

  const handleReturnToTitle = () => {
    resetGame(); // This will set gameState to TITLE and reset gameData
  };

  switch (gameState) {
    case GameState.TITLE:
      return <Title onGameStart={handleGameStart} />;
    case GameState.TUTORIAL:
      return <Tutorial onTutorialEnd={handleTutorialEnd} />;
    case GameState.MAIN_GAME:
      return (
        <MainGame
          gameData={gameData}
          navigateTo={navigateTo}
          setGameData={setGameData}
          onGameEnd={handleGameEnd}
        />
      );
    case GameState.RESULT:
      return (
        <Result
          gameData={gameData}
          onRestart={handleRestart}
          onReturnToTitle={handleReturnToTitle}
        />
      );
    default:
      return <Title onGameStart={handleGameStart} />;
  }
};

export default HighLowManager;
