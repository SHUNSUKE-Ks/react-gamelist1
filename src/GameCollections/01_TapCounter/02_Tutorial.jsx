// チュートリアル画面コンポーネント
export default function Tutorial() {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl mb-4">ルール</h2>
      <button onClick={onNext} className="px-6 py-2 bg-green-500 text-white rounded">
        ゲーム開始
      </button>
    </div>
  );
  
}
