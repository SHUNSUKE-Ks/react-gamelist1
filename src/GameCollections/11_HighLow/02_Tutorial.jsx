import React from 'react';

const Tutorial = ({ onTutorialEnd }) => {
  return (
    <div className="tutorial-screen">
      <h2>ルール説明</h2>
      <ol>
        <li>プレイヤーには現在のカード（表向き）と次のカード（裏向き）が表示される</li>
        <li>次のカードが現在のカードより「HIGH（高い）」か「LOW（低い）」かを予想</li>
        <li>予想後、次のカードがめくられて正解・不正解が判定される</li>
        <li>全10ラウンドでゲーム終了</li>
      </ol>
      <h2>カードの強さ</h2>
      <p>A(1) &lt; 2 &lt; 3 &lt; 4 &lt; 5 &lt; 6 &lt; 7 &lt; 8 &lt; 9 &lt; 10 &lt; J(11) &lt; Q(12) &lt; K(13)</p>
      <h2>得点システム</h2>
      <ul>
        <li><strong>正解時</strong>: (連続正解数 + 1) × 10点</li>
        <li><strong>不正解時</strong>: 0点、連続記録リセット</li>
        <li><strong>連続ボーナス</strong>: 連続正解するほど1回あたりの得点が増加</li>
      </ul>
      <button onClick={onTutorialEnd}>ゲーム開始！</button>
    </div>
  );
};

export default Tutorial;