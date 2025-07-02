import { createContext, useReducer, useContext } from "react";
import { GameState } from "@/constants/GameState";

const initialState = {
  gameState: GameState.GAMESELECT,
  currentGame: null,
  score: 0,
  timeLeft: 10
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_GAMESTATE":
      return { ...state, gameState: action.payload };
    case "SET_CURRENT_GAME":
      return { ...state, currentGame: action.payload };
    case "ADD_SCORE":
      return { ...state, score: state.score + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
