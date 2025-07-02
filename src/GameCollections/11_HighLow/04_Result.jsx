import React from 'react';

const Result = ({ score, gameHistory, maxConsecutiveWins, onRestart, onReturnToTitle }) => {
  const getEvaluation = (score) => {
    if (score >= 500) return '素晴らしい！完璧です！';
    if (score >= 300) return 'すごい！かなりの実力者ですね！';
    if (score >= 100) return '良い調子！';
    return 'もう少し頑張りましょう！';
  };

  return (
    <div className="result-screen">
      <h2>最終スコア</h2>
      <p className="final-score">{score}</p>
      <p className="evaluation-comment">{getEvaluation(score)}</p>
      <div className="statistics">
        <h3>詳細統計</h3>
        <p>正解数: {gameHistory.filter(h => h === 'O').length}</p>
        <p>最大連続記録: {maxConsecutiveWins}</p>
      </div>
      <div className="game-history">
        <h3>ゲーム履歴</h3>
        <div className="history-circles">
          {gameHistory.map((result, index) => (
            <span key={index} className={`circle ${result === 'O' ? 'correct' : 'incorrect'}`}></span>
          ))}
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={onRestart}>もう一度プレイ</button>
        <button onClick={onReturnToTitle}>タイトルに戻る</button>
      </div>
    </div>
  );
};

export default Result;