// タイトル画面コンポーネント
export default function Title({ onStart }) {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl mb-4">TAP COUNTER</h1>
      <button onClick={onStart} className="px-6 py-2 bg-blue-500 text-white rounded">
        START
      </button>
    </div>
  );
}
