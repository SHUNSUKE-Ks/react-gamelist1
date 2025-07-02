import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HighLow.css'; // CSSファイルをインポート

const MainGame = ({
  gameData,
  navigateTo,
  setGameData,
  onGameEnd,
}) => {
  const { score, round, consecutiveWins, gameHistory } = gameData;
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const nextCardRef = useRef(null); // 次のカードのDOM要素への参照

  const createDeck = () => {
    const suits = ['H', 'D', 'C', 'S'];
    const values = Array.from({ length: 13 }, (_, i) => i + 1);
    const newDeck = suits.flatMap(suit => values.map(value => ({ suit, value })));
    return newDeck;
  };

  const shuffleDeck = (deck) => {
    return deck.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
    setNextCard(newDeck[1]);
    setGameData(prev => ({ ...prev, round: 1, score: 0, consecutiveWins: 0, gameHistory: [] }));
  }, []);

  const handleGuess = (guess) => {
    if (isRevealed) return;

    setIsRevealed(true);

    // GSAPアニメーション
    gsap.to(nextCardRef.current, {
      rotationY: 180,
      duration: 0.6,
      onComplete: () => {
        const isHigh = nextCard.value > currentCard.value;
        const isLow = nextCard.value < currentCard.value;
        const isCorrect = (guess === 'HIGH' && isHigh) || (guess === 'LOW' && isLow);

        if (isCorrect) {
          const newConsecutiveWins = consecutiveWins + 1;
          const newScore = score + (newConsecutiveWins) * 10;
          setGameData(prev => ({ ...prev, score: newScore, consecutiveWins: newConsecutiveWins, gameHistory: [...prev.gameHistory, 'O'] }));
          setMessage('正解！');
        } else {
          setGameData(prev => ({ ...prev, consecutiveWins: 0, gameHistory: [...prev.gameHistory, 'X'] }));
          setMessage('不正解...');
        }

        setTimeout(() => {
          if (round < 10) {
            setGameData(prev => ({ ...prev, round: prev.round + 1 }));
            setCurrentCard(nextCard);
            setNextCard(deck[round + 1]);
            setIsRevealed(false);
            setMessage('');
            // カードを裏面に戻すアニメーション
            gsap.set(nextCardRef.current, { rotationY: 0 });
          } else {
            onGameEnd(gameData.score, [...gameData.gameHistory, isCorrect ? 'O' : 'X'], Math.max(gameData.maxConsecutiveWins, isCorrect ? gameData.consecutiveWins + 1 : 0));
          }
        }, 1000); // アニメーション後に少し待つ
      },
    });
  };
  
  const getCardString = (card) => {
    if (!card) return '';
    const { value } = card;
    if (value === 1) return 'A';
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value;
  }


  return (
    <div className="main-game">
      <div className="game-info-bar">
        <span>ラウンド: {round}/10</span>
        <span>スコア: {score}</span>
        <span>連続正解: {consecutiveWins}</span>
      </div>
      <div className="card-display-area">
        <div className="card current-card">{getCardString(currentCard)}</div>
        <div className="vs">VS</div>
        <div className="card next-card" ref={nextCardRef}> {/* refを追加 */}
          <div className="card-inner">
            <div className="card-front">?</div>
            <div className="card-back">{getCardString(nextCard)}</div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={() => handleGuess('HIGH')} disabled={isRevealed}>HIGH</button>
        <button onClick={() => handleGuess('LOW')} disabled={isRevealed}>LOW</button>
      </div>
      <div className="message-area">
        {message}
      </div>
    </div>
  );
};

export default MainGame;
