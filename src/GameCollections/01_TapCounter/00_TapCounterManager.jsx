import React from "react";
import { GameState } from '../../constants/GameState';
import useGameFlow from '../../hooks/useGameFlow';
import Title from "./01_Title";
import Tutorial from "./02_Tutorial";
import MainGame from "./03_MainGame";
import Result from "./04_Result";

const TapCounterManager = () => {
  const { gameState, gameData, navigateTo, resetGame } = useGameFlow({
    score: 0
  });

  switch (gameState) {
    case GameState.TITLE:
      return <Title onStart={() => navigateTo(GameState.TUTORIAL)} />;
    case GameState.TUTORIAL:
      return <Tutorial onNext={() => navigateTo(GameState.MAIN_GAME)} />;
    case GameState.MAIN_GAME:
      return <MainGame onFinish={(score) => navigateTo(GameState.RESULT, { score })} />;
    case GameState.RESULT:
      return <Result score={gameData.score} onRetry={() => resetGame()} />;
    default:
      return null;
  }
};

export default TapCounterManager;
