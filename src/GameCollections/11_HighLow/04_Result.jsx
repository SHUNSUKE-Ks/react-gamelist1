import React from 'react';

const Result = ({
  gameData,
  onRestart,
  onReturnToTitle,
}) => {
  const { score, gameHistory, maxConsecutiveWins } = gameData;

  return (
    <div className="result-screen">
      <h2>結果</h2>
      <p>最終スコア: {score}</p>
      <p>最大連続正解数: {maxConsecutiveWins}</p>
      <h3>ゲーム履歴:</h3>
      <div className="game-history">
        {gameHistory.map((result, index) => (
          <span key={index} className={result === 'O' ? 'correct' : 'incorrect'}>
            {result}
          </span>
        ))}
      </div>
      <button onClick={onRestart}>もう一度プレイ</button>
      <button onClick={onReturnToTitle}>タイトルに戻る</button>
    </div>
  );
};

export default Result;
