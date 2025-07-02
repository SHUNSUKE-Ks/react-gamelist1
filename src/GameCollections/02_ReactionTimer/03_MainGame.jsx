// src/GameCollections/02_ReactionTimer/03_MainGame.jsx
// 起動用プロンプト: npm run dev

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const MainGame = ({ onNext }) => {
  const [status, setStatus] = useState("waiting"); // waiting, ready
  const [message, setMessage] = useState("赤色になったらクリック...");
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const attemptRef = useRef(0);

  const boxRef = useRef();

  // ランダムな遅延の後にステータスを 'ready' に変更する
  useEffect(() => {
    if (status === "waiting" && attemptRef.current < 5) {
      const randomDelay = Math.random() * 4000 + 1000; // 1〜5秒
      timerRef.current = setTimeout(() => {
        setStatus("ready");
        startTimeRef.current = Date.now();
      }, randomDelay);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [status]);

  // 5回の試行が完了したら結果画面へ
  useEffect(() => {
    if (results.length === 5) {
      const sum = results.reduce((a, b) => a + b, 0);
      const avg = sum / results.length;
      const best = Math.min(...results);
      onNext({ attempts: results, averageTime: avg, bestTime: best });
    }
  }, [results, onNext]);

  const handleClick = () => {
    // フライングの場合
    if (status === "waiting") {
      clearTimeout(timerRef.current);
      setMessage("早すぎです！");
      setTimeout(() => {
        if (attemptRef.current < 5) {
          setMessage("赤色になったらクリック...");
          setStatus("waiting");
        }
      }, 1500);
      return;
    }

    // 成功した場合
    if (status === "ready") {
      const endTime = Date.now();
      const reactionTime = endTime - startTimeRef.current;
      setResults([...results, reactionTime]);
      setMessage(`${reactionTime} ms`);
      setStatus("waiting");
      attemptRef.current++;

      if (attemptRef.current < 5) {
        setTimeout(() => {
          setMessage("赤色になったらクリック...");
        }, 1500);
      }
    }
  };

  // ステータスに応じて色とメッセージを変更
  useEffect(() => {
    if (status === "ready") {
      gsap.to(boxRef.current, { backgroundColor: "#dc3545", duration: 0.1 }); // 赤色
      setMessage("今だ！");
    } else {
      gsap.to(boxRef.current, { backgroundColor: "#808080", duration: 0.1 }); // グレー
    }
  }, [status]);

  return (
    <div className="reaction-timer-container">
      <div className="fixed-header">
        <h2>回数 {attemptRef.current + 1} / 5</h2>
      </div>

      <div className="fixed-game-area">
        <div ref={boxRef} className="reaction-box" onClick={handleClick}>
          <p>{message}</p>
        </div>
      </div>

      <div className="fixed-results-section">
        <h3>記録:</h3>
        <div className="results-list">
          {results.map((time, index) => (
            <div key={index} className="result-item">
              {index + 1}回目: {time} ms
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainGame;
