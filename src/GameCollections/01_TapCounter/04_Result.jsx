// リザルト画面コンポーネント
export default function Result({ score, onRetry }) {
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl mb-4">結果発表！！</h2>
      <p className="text-3xl mb-4">あなたのscore:{score}</p>
      <button onClick={onRetry} className="px-6 py-2 bg-purple-500 text-white rounded">
        リトライ
      </button>
    </div>
  );
}
