import React from 'react';

const Title = ({ onGameStart }) => {
  return (
    <div className="title-screen">
      <h1>HIGH LOW</h1>
      <p>現在のカードと次のカードを比較して、次のカードが現在のカードより「高い」か「低い」かを正確に予想し、10ラウンドで最高得点を獲得する</p>
      <button onClick={onGameStart}>ゲームスタート</button>
    </div>
  );
};

export default Title;