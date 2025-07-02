import { GameProvider, useGame } from "@/GameManager/StateProvider";
import { GameState } from "@/constants/GameState";
import TitleScreen from "@/GameScenes/TitleScreen";
import TapCounter from "@/GameCollections/01_TapCounter/TapCounter";
import TapCounterManager from "./GameCollections/01_TapCounter/00_TapCounterManager";
import HighLowManager from "./GameCollections/11_HighLow/00_HighLowManager";
import ReactionTimerManager from "./GameCollections/02_ReactionTimer/00_ReactionTimerManager";
import TestList from "./GameCollections/TestList";
import DialogueBoxModule from "./components/DialogueBox/DialogueBoxModule";

const gameList = [
  {
    id: "TapCounter",
    title: "タップカウンター",
    description: "制限時間内にボタンを連打してスコアを稼ごう！"
  },
  {
    id: "HighLow",
    title: "High & Low",
    description: "次のカードが高いか低いか予測しよう！"
  },
  {
    id: "ReactionTimer",
    title: "リアクションタイマー",
    description: "画面の色が変わったら素早くクリック！君の反応速度を試そう！"
  }
];

function GameRouter() {
  const { state, dispatch } = useGame();

  const handleSelect = (gameId) => {
    dispatch({ type: "SET_CURRENT_GAME", payload: gameId });
    dispatch({ type: "SET_GAMESTATE", payload: GameState.TITLE });
  };

  if (state.gameState === GameState.GAMESELECT) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ゲーム一覧</h1>
        <ul className="space-y-4">
          {gameList.map((game) => (
            <li key={game.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-sm text-gray-600">{game.description}</p>
              <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded" onClick={() => handleSelect(game.id)}>
                プレイ
              </button>
            </li>
          ))}
        </ul>
        <DialogueBoxModule />
        {/* <TapCounterManager /> */}
        {/* <TestList /> */}
      </div>
    );
  }

  if (state.gameState === GameState.TITLE) {
    const current = gameList.find((g) => g.id === state.currentGame);
    // return <TitleScreen title={current?.title || "タイトル"} />;
    switch (state.currentGame) {
      case "TapCounter":
        return <TapCounterManager />;
      case "HighLow":
        return <HighLowManager />;
      case "ReactionTimer":
        return <ReactionTimerManager />;
      default:
        return <div>ゲームが見つかりません</div>;
    }
  }

  if (state.currentGame === "TapCounter") {
    return <TapCounter />;
  }
  
  if (state.currentGame === "HighLow") {
    return <HighLowManager />;
  }

  return <div>ゲームが見つかりません</div>;
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
