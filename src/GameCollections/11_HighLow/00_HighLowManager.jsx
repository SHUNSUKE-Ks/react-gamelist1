import React, { useState } from 'react';
import Title from './01_Title';
import Tutorial from './02_Tutorial';
import MainGame from './03_MainGame';
import Result from './04_Result';
import { GameState } from '../../constants/GameState';

const HighLowManager = () => {
  const [gameState, setGameState] = useState(GameState.TITLE);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [maxConsecutiveWins, setMaxConsecutiveWins] = useState(0);


  const handleGameStart = () => {
    setGameState(GameState.TUTORIAL);
  };

  const handleTutorialEnd = () => {
    setGameState(GameState.MAIN_GAME);
  };

  const handleGameEnd = (finalScore, history, maxWins) => {
    setScore(finalScore);
    setGameHistory(history);
    setMaxConsecutiveWins(maxWins);
    setGameState(GameState.RESULT);
  };

  const handleRestart = () => {
    setScore(0);
    setRound(1);
    setConsecutiveWins(0);
    setGameHistory([]);
    setMaxConsecutiveWins(0);
    setGameState(GameState.MAIN_GAME);
  };

  const handleReturnToTitle = () => {
    setScore(0);
    setRound(1);
    setConsecutiveWins(0);
    setGameHistory([]);
    setMaxConsecutiveWins(0);
    setGameState(GameState.TITLE);
  };

  switch (gameState) {
    case GameState.TITLE:
      return <Title onGameStart={handleGameStart} />;
    case GameState.TUTORIAL:
      return <Tutorial onTutorialEnd={handleTutorialEnd} />;
    case GameState.MAIN_GAME:
      return (
        <MainGame
          score={score}
          setScore={setScore}
          round={round}
          setRound={setRound}
          consecutiveWins={consecutiveWins}
          setConsecutiveWins={setConsecutiveWins}
          gameHistory={gameHistory}
          setGameHistory={setGameHistory}
          onGameEnd={handleGameEnd}
        />
      );
    case GameState.RESULT:
      return (
        <Result
          score={score}
          gameHistory={gameHistory}
          maxConsecutiveWins={maxConsecutiveWins}
          onRestart={handleRestart}
          onReturnToTitle={handleReturnToTitle}
        />
      );
    default:
      return <Title onGameStart={handleGameStart} />;
  }
};

export default HighLowManager;