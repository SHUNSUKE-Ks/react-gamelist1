// npm run dev
import { useEffect, useState } from "react";

// メインゲーム画面コンポーネント
export default function MainGame({ onFinish }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // typo修正: setTimeLesft → setTimeLeft

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onFinish]); // 依存配列にscoreとonFinishを追加

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl mb-2">時間：{timeLeft}秒</h2>
      <p className="mb-4">スコア：{score}</p>
      <button
        onClick={() => setScore(score + 1)} // button と onClick の間にスペース追加
        className="px-8 py-4 bg-red-500 text-white rounded text-xl">
        TAP!
      </button>
    </div>
  );
}
