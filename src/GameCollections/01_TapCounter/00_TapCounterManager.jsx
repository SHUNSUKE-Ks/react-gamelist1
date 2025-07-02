// npm run dev
import { useReducer } from "react";
import Title from "./01_Title";
import Tutorial from "./02_Tutorial"; // Tutorial コンポーネントをインポート
import MainGame from "./03_MainGame"; // MainGame コンポーネントをインポート
import Result from "./04_Result"; // Result コンポーネントをインポート

//ステート一覧
const GameStates = {
  TITLE: "TITLE",
  TUTORIAL: "TUTORIAL",
  MAINGAME: "MAINGAME",
  RESULT: "RESULT"
};

//初期State
const initialState = {
  gameState: GameStates.TITLE,
  score: 0
};

//Reducer関数
function reducer(state, action) {
  switch (action.type) {
    case "TO_TUTORIAL":
      return { ...state, gameState: GameStates.TUTORIAL };
    case "TO_MAINGAME":
      return { ...state, gameState: GameStates.MAINGAME };
    case "TO_RESULT":
      return { ...state, gameState: GameStates.RESULT, score: action.payload };
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

//管理Component
export default function TapCounterManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  switch (state.gameState) {
    case GameStates.TITLE:
      return <Title onStart={() => dispatch({ type: "TO_TUTORIAL" })} />;
    case GameStates.TUTORIAL:
      return <Tutorial onNext={() => dispatch({ type: "TO_MAINGAME" })} />;
    case GameStates.MAINGAME:
      return <MainGame onFinish={(score) => dispatch({ type: "TO_RESULT", payload: score })} />;
    case GameStates.RESULT:
      return <Result score={state.score} onRetry={() => dispatch({ type: "RESTART" })} />;
    default:
      return null;
  }
}
